import React from 'react';
import Recoil from 'recoil';
// import styled from 'styled-components';

import {historyWhereIndex, wordState} from '../state';
import {styled} from '../styled';
import Letter from './Letter';

const {useRecoilValue} = Recoil;

const WordContainer = styled('div', {
  borderBottom: '2px solid transparent',
  margin: '.25em',
  fontSize: '1.6rem',

  variants: {
    state: {
      incorrect: {
        borderBottom: '2px solid $error',
      },
    },
  },
});

const Word = ({i}: {i: number}) => {
  const $word = useRecoilValue(wordState(i));
  const $history = useRecoilValue(historyWhereIndex(i));
  const isIncorrect =
    typeof $history === 'boolean' && !$history ? 'incorrect' : undefined;

  return (
    <WordContainer state={isIncorrect}>
      {$word.map((letter) => (
        <Letter self={letter} key={letter.id} />
      ))}
    </WordContainer>
  );
};

export default Word;
