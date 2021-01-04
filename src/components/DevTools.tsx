import React from 'react';

import {Box} from './Box';

import {socket} from '../utils/socket';

export const DevTools = () => {
  const _join = (roomId: string) => {
    socket.emit('client.join', {roomId});
  };
  return (
    <Box style={{position: 'absolute', top: 0, left: 0}} tabIndex={-1}>
      <button onClick={() => _join('123')}>Join Test Room</button>
    </Box>
  );
};
