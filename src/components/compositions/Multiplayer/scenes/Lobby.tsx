import React from 'react';
import styled from 'styled-components';
import {color} from 'styled-system';
import {useSocketConnection} from '../../../../hooks/useSocketHandler';

import {Box} from '../../../Box';
import {Button} from '../../../Button';

const CompositionContainer = styled(Box)`
  display: grid;
  grid-area: content;
  grid-template-areas:
    'name name'
    'core rules'
    'ready ready';
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto;
  position: relative;
  gap: 1em;
  padding: 2em;
  border-radius: 7px;
`;

const LobbyName = styled('h1')(color, {
  fontSize: '4.5vmin',
  margin: 0,
});

export const LobbyScene = ({roomState}: any) => {
  const {socket} = useSocketConnection();
  return (
    <CompositionContainer>
      <Box gridArea="name">
        <LobbyName color="text">{roomState?.name}</LobbyName>
      </Box>
      <Box gridArea="core" display="flex" flexDirection="column">
        {roomState?.players.map((player: any) => {
          return <span key={player.userId}>{player.username}</span>;
        })}
      </Box>
      <Box gridArea="rules">something should go here</Box>
      <Box gridArea="ready" gridColumn="1 / 4">
        <Button
          onClick={() => {
            socket.emit('client.ready', true);
          }}
        >
          I'm Ready
        </Button>
      </Box>
    </CompositionContainer>
  );
};
