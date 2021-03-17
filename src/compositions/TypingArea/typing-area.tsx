import React from 'react';
import styled from 'styled-components';
import {useRecoilState, useRecoilValue} from 'recoil';

import {focusedState, testTypingState} from '../../state';
import {CaptureFocus} from '../../components/CaptureFocus';
import WordsMix from './typing-wordsmix';
import useTyping from '../../hooks/useTyping';
import {animated, useTransition} from 'react-spring';
import {TypingResults} from './typing-results';
import {Box} from '../../components/Box';
import {ActionBar} from '../Play/play-actionbar';

const Container = styled(Box)<{obfuscate: boolean}>`
  grid-area: content;
  width: 100%;
  align-self: center;
  filter: ${({obfuscate}) => (obfuscate ? 'blur(4px)' : 'none')};
  position: 'absolute';
`;

export function TypingPractice({obfuscate = false}) {
  const [focused] = useRecoilState(focusedState);
  const typingState = useRecoilValue(testTypingState);
  const transitions = useTransition(typingState === 'DONE', null, {
    from: {transform: 'translateY(-20px)'},
    enter: {transform: 'translateY(0px)'},
    leave: {opacity: 0},
  });

  useTyping({when: focused});
  return (
    <Container obfuscate={obfuscate}>
      {transitions.map(({item, key, props}) =>
        item ? (
          <animated.div key={key} style={{...props, width: '100%'}}>
            <TypingResults />
          </animated.div>
        ) : (
          <animated.div key={key} style={{...props, width: '100%'}}>
            <ActionBar />
            <CaptureFocus>
              <WordsMix />
            </CaptureFocus>
          </animated.div>
        ),
      )}
    </Container>
  );
}

export function TypingMultiplayer({obfuscate = false}) {
  const [focused] = useRecoilState(focusedState);
  const typingState = useRecoilValue(testTypingState);
  const transitions = useTransition(typingState === 'DONE', null, {
    from: {transform: 'translateY(-20px)'},
    enter: {transform: 'translateY(0px)'},
    leave: {opacity: 0},
  });

  useTyping({when: focused});
  return (
    <Container obfuscate={obfuscate}>
      {transitions.map(({item, key, props}) =>
        item ? (
          <animated.div key={key} style={{...props, width: '100%'}}>
            <TypingResults />
          </animated.div>
        ) : (
          <animated.div key={key} style={{...props, width: '100%'}}>
            {/* <ActionBar /> */}
            <CaptureFocus>
              <WordsMix />
            </CaptureFocus>
          </animated.div>
        ),
      )}
    </Container>
  );
}

// export function TypingArea() {}
