import React from 'react';

import {useSocketConnection} from '../../../hooks/useSocketHandler';
import {Box} from '../../../components/Box';
import {Button} from '../../../components/Button';
import {styled} from '../../../styled';

const CompositionContainer = styled(Box, {
  display: 'grid',
  gridArea: 'content',
  gridTemplateAreas: "'name name' 'core rules' 'ready ready'",
  gridTemplateColumns: '3fr 1fr',
  gridTemplateRows: 'auto',
  position: 'relative',
  gap: '1em',
  padding: '2em',
  borderRadius: '7px',
});

const LobbyName = styled('h1', {
  fontSize: '4.5vmin',
  margin: 0,
  color: '$text',
});

export const LobbyScene = ({roomState}: any) => {
  const {socket} = useSocketConnection();
  return (
    <CompositionContainer>
      <Box gridArea="name">
        <LobbyName>{roomState?.name}</LobbyName>
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
