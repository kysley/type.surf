import {useCallback, useEffect, useState} from 'react';
import {v4} from 'uuid';

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
  const [roomState, setRoomState] = useState<{
    players: any[];
    id: string;
    name: string;
    state: string;
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

  useEffect(() => {
    if (roomId && !fetching) connect(roomId);
  }, [connect, roomId, fetching]);

  useEffect(() => {
    socket.on('server.room.broadcast', (roomData: any) => {
      setRoomState((prev) => ({...prev, ...roomData}));
    });
    return () => {
      socket.emit('client.leave', {roomId}, anon.userId);
    };
  }, []);

  return {
    connect,
    roomState,
  };
}
