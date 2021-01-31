import React from 'react';
import {useRecoilValue} from 'recoil';
import {useNavigate} from 'react-router-dom';

import {focusedState} from '../state';
import {Box} from './Box';
import {useSocketConnection} from '../hooks/useSocketHandler';

// import {socket} from '../utils/socket';

export const DevTools = () => {
  const {socket} = useSocketConnection();
  const navigate = useNavigate();
  const focus = useRecoilValue(focusedState);
  const _join = (roomId: string) => {
    navigate(`/p/${roomId}`);
  };
  return (
    <Box
      style={{position: 'absolute', top: 0, left: 0}}
      tabIndex={-1}
      flexDirection="column"
      display="flex"
    >
      <button onClick={() => _join('123')}>Join Test Room</button>
      <span>focused: {JSON.stringify(focus)}</span>
      <span>socket: {socket.connected ? 'conn' : 'x'}</span>
    </Box>
  );
};
