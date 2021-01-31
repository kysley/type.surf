import React, {memo} from 'react';
import Recoil from 'recoil';
import styled from 'styled-components';

import {historyWhereIndex, wordStateWhereIndex} from '../state';
import Letter from './Letter';

const {useRecoilValue} = Recoil;

const WordContainer = styled.div<{correct: boolean | undefined}>`
  border-bottom: 2px solid transparent;
  border-bottom: ${({correct}) =>
    correct !== undefined && !correct && '2px solid var(--miss-color)'};
  margin: 0.25em;
  font-size: 1.6em;
`;

const Word = ({i}: {i: number}) => {
  const $word = useRecoilValue(wordStateWhereIndex(i));
  const $history = useRecoilValue(historyWhereIndex(i));

  return (
    <WordContainer correct={$history}>
      {$word.map((letter) => (
        <Letter self={letter} key={letter.id} />
      ))}
    </WordContainer>
  );
};

export default memo(Word);
