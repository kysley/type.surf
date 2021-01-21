import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {useRecoilCallback, useRecoilValue, useSetRecoilState} from 'recoil';

import {useRoomConnection} from '../../../hooks/useRoomConnection';
import {LobbyScene} from './scenes/Lobby';
import {StartedScene} from './scenes/Started';
import {wordIndex, wordList} from '../../../state';
import {useSocketConnection} from '../../../hooks/useSocketHandler';
import {statsForNerds} from '../../../state/state';

const Container = styled('div')({
  display: 'grid',
  gridGap: '1em',
  gridTemplateAreas: '"gl content gr"',
  gridTemplateColumns: '300px 1fr 100px',
  gridArea: 'main',
});

function useStateSync() {
  const wI = useRecoilValue(wordIndex);
  const {socket} = useSocketConnection();
  const [roomState, setRoomState] = useState<{
    players: any[];
    id: string;
    name: string;
    state: 'LOBBY' | 'STARTED' | 'PAUSED' | 'ENDING' | 'STARTING';
    words: string[];
  }>();
  const setWordList = useSetRecoilState(wordList);

  useEffect(() => {
    setWordList(roomState?.words || []);
  }, [roomState?.words, setWordList]);

  const getStats = useRecoilCallback(
    ({snapshot}) => async () => {
      const stats = await snapshot.getPromise(statsForNerds);
      socket.emit('client.stats', {stats: {...stats}});
      return stats;
    },
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
  }, []);

  return {
    roomState,
  };
}

const LobbyComposition = () => {
  const {id} = useParams();
  useRoomConnection(id);
  const {roomState} = useStateSync();

  return (
    <Container>
      <>
        {roomState?.state === 'LOBBY' && <LobbyScene roomState={roomState} />}
        {(roomState?.state === 'STARTED' ||
          roomState?.state === 'STARTING') && (
          <StartedScene roomState={roomState} />
        )}
      </>
    </Container>
  );
};

const LobbyCompositionUNSAFE = () => {
  const roomState: {
    players: any[];
    id: string;
    name: string;
    state: 'LOBBY' | 'STARTED' | 'PAUSED' | 'ENDING' | 'STARTING';
    words: string[];
  } = {
    id: '007',
    name: 'Offline Room',
    words: 'here are a few words that you can type if you want there isnt actually any reason to other than to test well nothing'.split(
      ' ',
    ),
    state: 'STARTING',
    countdown: '10',
    players: [
      {
        userId: '1',
        username: 'fake player',
        discriminator: '0001',
        stats: {
          wpm: 90,
        },
      },
      {
        userId: '2',
        username: 'another guy',
        discriminator: '8888',
        stats: {
          wpm: 76,
        },
      },
    ],
  };
  return (
    <Container>
      <>
        {roomState?.state === 'LOBBY' && <LobbyScene roomState={roomState} />}
        {(roomState?.state === 'STARTED' ||
          roomState?.state === 'STARTING') && (
          <StartedScene roomState={roomState} />
        )}
      </>
    </Container>
  );
};

export {LobbyComposition, LobbyCompositionUNSAFE};
