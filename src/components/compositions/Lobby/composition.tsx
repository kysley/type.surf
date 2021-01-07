import React from 'react';
import styled from 'styled-components';
import {useRecoilState} from 'recoil';
import {color} from 'styled-system';

import useTyping from '../../../hooks/useTyping';
import {CaptureFocus} from '../../../components/CaptureFocus';
import {Box} from '../../../components/Box';
import {contextualWindowState, focusedState} from '../../../state/state';
import useKeypress from '../../../hooks/useKeyPress';
import {Button} from '../../Button';
import {useParams} from 'react-router-dom';
import {useRoomConnection} from '../../../hooks/useRoomConnection';

const CompositionContainer = styled(Box)`
  display: grid;
  grid-area: main;
  grid-template-areas:
    'name name name'
    'core core rules'
    'ready ready ready';
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto;
  width: 35vw;
  position: relative;
  gap: 1em;
  padding: 2em;
  border-radius: 7px;

  ${Box} {
    background: 'secondary';
  }
`;

const LobbyName = styled('h1')(color, {
  fontSize: '4.5vmin',
  margin: 0,
});

const LobbyComposition = () => {
  const {id} = useParams();
  useRoomConnection(id);

  return (
    <Box gridArea="main">
      <CompositionContainer>
        <Box gridArea="name">
          <LobbyName color="text">Lobby Name that is longer ...</LobbyName>
        </Box>
        <Box gridArea="core">Player List goes here</Box>
        <Box gridArea="rules">don't do that</Box>
        <Box gridArea="ready" gridColumn="1 / 4">
          <Button>I'm Ready</Button>
        </Box>
      </CompositionContainer>
    </Box>
  );
};

export {LobbyComposition};
