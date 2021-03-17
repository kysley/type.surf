import React, {useEffect, useRef} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import {focusedState, testTypingState} from '../../state';
import {CaptureFocus} from '../../components/CaptureFocus';
import WordsMix from './typing-wordsmix';
import useTyping from '../../hooks/useTyping';
import {animated, useTransition} from 'react-spring';
import {TypingResults} from './typing-results';
import {Box} from '../../components/Box';
import {ActionBar} from '../Play/play-actionbar';
import {styled} from './../../styled';

const Container = styled(Box, {
  gridArea: 'content',
  width: '100%',
  alignSelf: 'center',
  // filter: ${({obfuscate}) => (obfuscate ? 'blur(4px)' : 'none')};
  position: 'absolute',
});

const HiddenTextArea = styled('textarea', {
  position: 'absolute',
  left: 0,
  top: 0,
  background: 'transparent',
  border: 'none',
  color: 'transparent',
  outline: 'none',
  padding: 0,
  resize: 'none',
  zIndex: 1,
  overflow: 'hidden',
  whietSpace: 'pre',
  textIndent: '-99999em',
});

export function TypingPractice({obfuscate = false}) {
  const [focused] = useRecoilState(focusedState);
  const typingState = useRecoilValue(testTypingState);
  const transitions = useTransition(typingState === 'DONE', null, {
    from: {transform: 'translateY(-20px)'},
    enter: {transform: 'translateY(0px)'},
    leave: {opacity: 0},
  });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (focused) textAreaRef.current?.focus();
    else textAreaRef.current?.blur();
  }, [focused]);

  const {inputHandler} = useTyping();

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
            <HiddenTextArea ref={textAreaRef} onKeyDown={inputHandler} />
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {inputHandler} = useTyping();
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
            <HiddenTextArea ref={textAreaRef} onKeyDown={inputHandler} />
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
