import {useEffect, useState} from 'react';
import {useRecoilCallback, useRecoilValue, useSetRecoilState} from 'recoil';

import {statsForNerds, wordIndex, wordList} from '../state';
import {useSocketConnection} from './useSocketHandler';

export function useStateSync() {
  const wI = useRecoilValue(wordIndex);
  const {socket} = useSocketConnection();
  const [roomState, setRoomState] = useState<{
    players: any[];
    id: string;
    name: string;
    state: 'LOBBY' | 'STARTED' | 'PAUSED' | 'ENDING' | 'STARTING' | 'WAITING';
    words: string[];
  }>();
  const setWordList = useSetRecoilState(wordList);

  useEffect(() => {
    setWordList(roomState?.words || []);
  }, [roomState?.words, setWordList]);

  const getStats = useRecoilCallback(
    ({snapshot}) => async () => {
      const stats = await snapshot.getPromise(statsForNerds);
      socket.emit('client.stats', {stats});
      return stats;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    getStats();
  }, [getStats, wI]);

  useEffect(() => {
    socket.on('server.room.broadcast', (roomData: any) => {
      console.log(roomData);
      setRoomState((prev) => ({...prev, ...roomData}));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    roomState,
  };
}
