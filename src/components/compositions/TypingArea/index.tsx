import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useRecoilState} from 'recoil';

import WordsMix from './WordsMix';
import useTyping from '../../../hooks/useTyping';
import {CaptureFocus} from '../../../components/CaptureFocus';
import {Box} from '../../../components/Box';
import {focusedState} from '../../../state';

const Container = styled(Box)<{obfuscate: boolean}>`
  grid-area: content;
  width: 100%;
  align-self: center;
  filter: ${({obfuscate}) => (obfuscate ? 'blur(4px)' : 'none')};
`;

const TypingAreaComposition = ({obfuscate = false}) => {
  const [focused, setFocusedState] = useRecoilState(focusedState);

  // useKeypress(
  //   'Tab',
  //   () => {
  //     console.log('contextual state true');
  //     setContextState(true);
  //     setFocusedState(false);
  //   },
  //   focused,
  // );

  // useKeypress(
  //   'Escape',
  //   () => {
  //     console.log('close contextual state');
  //     setContextState(false);
  //     setFocusedState(true);
  //   },
  //   contextOpen,
  // );

  useTyping({when: focused});

  return (
    <Container obfuscate={obfuscate}>
      <CaptureFocus>
        <WordsMix />
      </CaptureFocus>
    </Container>
  );
};

export default TypingAreaComposition;
