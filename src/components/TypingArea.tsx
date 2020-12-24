import React, {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';

import {focusedState} from '../state/state';
import {socket} from '../utils/socket';

export const CaptureFocus: React.FC = ({children}) => {
  const setFocused = useSetRecoilState(focusedState);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on('server.ping', () => {});
  }, []);

  function handleFocus(e: React.FocusEvent<HTMLDivElement>) {
    setFocused(true);
  }
  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    setFocused(false);
  }
  return (
    <div onFocus={handleFocus} onBlur={handleBlur}>
      {children}
    </div>
  );
};
