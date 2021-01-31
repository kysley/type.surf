import css from '@styled-system/css';
import React from 'react';
import {animated} from 'react-spring';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components';

import {TypingProgressState} from '../state';

const ProgressbarContainer = styled(animated.div)(
  css({
    fontSize: '2rem',
  }),
);

export const Progressbar = ({time = null}) => {
  const x = useRecoilValue(TypingProgressState);

  return (
    <ProgressbarContainer>
      <span>{x}</span>
    </ProgressbarContainer>
  );
};
