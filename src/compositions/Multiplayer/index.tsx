import React from 'react';
import {Route, Routes, useParams} from 'react-router-dom';

import {useRoomConnection} from '../../hooks/useRoomConnection';
import {LobbyScene} from './scenes/Lobby';
import {StartedScene} from './scenes/Started';
import {styled} from '../../styled';
import {MultiplayerHome} from './Home';
import {useStateSync} from '../../hooks/useStateSync';
import {PrivateCreate} from './PrivateGame/private-create';

const Container = styled('div', {});

const LobbyComposition = () => {
  const {id} = useParams();
  useRoomConnection(id);
  const {roomState} = useStateSync();

  return (
    <Container>
      <>
        {roomState?.state === 'LOBBY' && <LobbyScene roomState={roomState} />}
        {(roomState?.state === 'STARTED' ||
          roomState?.state === 'STARTING' ||
          roomState?.state === 'WAITING') && (
          <StartedScene roomState={roomState} />
        )}
      </>
    </Container>
  );
};

const PlayMultipayer = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MultiplayerHome />} />
        <Route path=":id" element={<LobbyComposition />} />
        <Route path="/create" element={<PrivateCreate />} />
      </Routes>
    </div>
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
    //@ts-ignore
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

export {LobbyComposition, LobbyCompositionUNSAFE, PlayMultipayer};
