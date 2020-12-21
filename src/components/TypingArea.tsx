import React from 'react';
import {useSetRecoilState} from 'recoil';

import {focusedState} from '../state/state';

export const CaptureFocus: React.FC = ({children}) => {
  const setFocused = useSetRecoilState(focusedState);
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
