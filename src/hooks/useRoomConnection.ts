import {useCallback, useEffect, useState} from 'react';
import {useRecoilCallback, useSetRecoilState} from 'recoil';
import {v4} from 'uuid';

import {wordList} from '../state';
import {statsForNerds} from '../state/state';
import {useMe} from './api/useMe';
import {useSocketConnection} from './useSocketHandler';

function createAnonPlayer() {
  return {
    userId: v4(),
    username: 'Anon',
    discriminator: Math.floor(1000 + Math.random() * 9000),
  };
}

const anon = createAnonPlayer();

export function useRoomConnection(roomId?: string) {
  const {user, fetching} = useMe();
  const {socket} = useSocketConnection();
  const setWordList = useSetRecoilState(wordList);
  const [roomState, setRoomState] = useState<{
    players: any[];
    id: string;
    name: string;
    state: string;
    words: string[];
  }>();

  const connect = useCallback(
    (roomId: string) => {
      socket.emit(
        'client.join',
        {roomId},
        user
          ? {
              username: user?.username,
              discriminator: user?.discriminator,
              userId: user?.id,
            }
          : anon,
      );
    },
    [socket, user],
  );

  const getStats = useRecoilCallback(
    ({snapshot}) => async () => {
      const stats = await snapshot.getPromise(statsForNerds);
      return {...stats, userId: user?.id || anon.userId};
    },
    [user],
  );

  useEffect(() => {
    if (roomId && !fetching) connect(roomId);
  }, [connect, roomId, fetching]);

  useEffect(() => {
    socket.on('server.room.broadcast', (roomData: any) => {
      console.log(roomData);
      setRoomState((prev) => ({...prev, ...roomData}));
    });

    socket.on('server.request.stats', async (cb: any) => {
      const stats = await getStats();
      cb(null, stats);
    });

    return () => {
      socket.emit('client.leave', {roomId}, anon.userId);
    };
  }, [getStats, roomId]);

  useEffect(() => {
    setWordList(roomState?.words || []);
  }, [roomState?.words, setWordList]);

  return {
    connect,
    roomState,
  };
}
