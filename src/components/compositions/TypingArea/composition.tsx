import React from 'react';
import styled from 'styled-components';
import {useRecoilState, useRecoilValue} from 'recoil';

import WordsMix from './WordsMix';
import {ContextMix} from './ResetMix';
import useTyping from '../../../hooks/useTyping';
import {CaptureFocus} from '../../../components/CaptureFocus';
import {Box} from '../../../components/Box';
import {contextualWindowState, focusedState} from '../../../state/state';
import useKeypress from '../../../hooks/useKeyPress';

const CompositionContainer = styled(Box)`
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
  position: relative;
`;

const TypingAreaComposition = () => {
  // const [focused, setFocused] = useState(false);
  const [focused, setFocusedState] = useRecoilState(focusedState);
  const [contextOpen, setContextState] = useRecoilState(contextualWindowState);

  useKeypress(
    'Tab',
    () => {
      console.log('contextual state true');
      setContextState(true);
      setFocusedState(false);
      // document.activeElement.blur();
    },
    focused,
  );

  useKeypress(
    'Escape',
    () => {
      console.log('close contextual state');
      setContextState(false);
      setFocusedState(true);
    },
    contextOpen,
  );

  useTyping({when: focused});

  return (
    <Box gridArea="main">
      <CaptureFocus>
        <CompositionContainer>
          <WordsMix />
          {contextOpen && <ContextMix />}
          {/* <ResetMix /> */}
        </CompositionContainer>
      </CaptureFocus>
    </Box>
  );
};

export default TypingAreaComposition;
