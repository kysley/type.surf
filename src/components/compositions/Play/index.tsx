import React from 'react';
import {useNavigate} from 'react-router-dom';

import {useSocketConnection} from '../../../hooks/useSocketHandler';
import {Box} from '../../Box';

export const Play = () => {
  const {socket} = useSocketConnection();
  const navigate = useNavigate();
  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr 1fr"
      gridGap="3em"
      gridArea="main"
      onClick={() =>
        socket.emit('client.queue', 'RACE', (roomId: string) => {
          navigate(`/p/${roomId}`);
        })
      }
    >
      <Box bg="primary">
        <h2>Race</h2>
      </Box>
      <Box>
        <h2>Circuit (soon)</h2>
      </Box>
    </Box>
  );
};
