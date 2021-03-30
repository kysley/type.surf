import React from 'react';
import {animated} from 'react-spring';
import {useRecoilValue} from 'recoil';

import {styled} from '../styled';

import {TypingProgressState} from '../state';

const ProgressbarContainer = styled(animated.div, {
  fontSize: '2rem',
});

export const Progressbar = ({time = null}) => {
  const x = useRecoilValue(TypingProgressState);

  return (
    <ProgressbarContainer>
      <span>{x}</span>
    </ProgressbarContainer>
  );
};
