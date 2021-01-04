import React, {useEffect, useRef, useState} from 'react';
import {useSetRecoilState} from 'recoil';

import {focusedState} from '../state/state';
import {Box} from './Box';

export const CaptureFocus: React.FC = ({children}) => {
  const setFocused = useSetRecoilState(focusedState);
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      event.preventDefault();
      event.stopPropagation();
      if (captureRef.current && !captureRef.current.contains(event.target)) {
        console.log('focus lost');
        setFocused(false);
      } else {
        console.log('focused gained');
        setFocused(true);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setFocused]);

  return (
    <Box display="flex" ref={captureRef}>
      {children}
    </Box>
  );
};
