import React, {useState} from 'react';
import styled from 'styled-components';

import WordsMix from './WordsMix';
import useTyping from '../../../hooks/useTyping';
import ResetMix from './ResetMix';

const CompositionContainer = styled.section`
  display: grid;
  grid-area: main;
  grid-template-areas:
    'mods time'
    'typing typing'
    'reset reset'
    'results results';
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto;
  width: 50vw;
`;

const TypingAreaComposition = () => {
  const [focused, setFocused] = useState(false);
  // const {resetTest} = useTyping({when: focused});

  return (
    <CompositionContainer>
      <WordsMix callback={setFocused} />
      {/* <ResetMix reset={resetTest} /> */}
    </CompositionContainer>
  );
};

export default TypingAreaComposition;
