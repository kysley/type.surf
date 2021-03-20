import React, {useEffect, useLayoutEffect, useMemo} from 'react';
import {useSpring, animated} from 'react-spring';
import {useRecoilValue, useSetRecoilState} from 'recoil';
// import styled from 'styled-components';
// import css from '@styled-system/css';

import {EOLState} from '../state';
import {wordIndex, letterIndex} from '../state';
import {styled} from '../styled';

const StyledCaret = styled(animated.div, {background: '$caret'});

export const Caret = ({
  container,
  breaks,
  hasScrolled,
}: {
  container: React.RefObject<HTMLDivElement>;
  breaks: number[];
  hasScrolled: boolean;
}) => {
  const setEOL = useSetRecoilState(EOLState);
  const wordIdx = useRecoilValue(wordIndex);
  const letterIdx = useRecoilValue(letterIndex);
  const [caretPos, setCaretPos] = useSpring(() => ({
    marginLeft: 0,
    top: 5,
    config: {duration: 95, friction: 5},
  }));

  const horizontalSpaceBetweenWords = useMemo(
    () =>
      Math.abs(
        (container?.current?.children[breaks[0]]?.getBoundingClientRect()
          .right || 30) -
          (container?.current?.children[breaks[0] + 1]?.getBoundingClientRect()
            .left || 20),
      ),
    [breaks, container],
  );

  // reset the caret position if wordIndex goes back to 0
  // this will probably break once we allow backspacing across words
  useEffect(() => {
    if (wordIdx === 0) setCaretPos({marginLeft: 0, top: 8});
  }, [setCaretPos, wordIdx]);

  useLayoutEffect(() => {
    if (container.current) {
      const parentDom = container.current.getBoundingClientRect();
      const wordDom = container.current.children[wordIdx];

      if (wordDom) {
        let newLeft;
        const letters = wordDom.children;

        // Overflow/EXTRA characters
        if (letterIdx >= letters.length) {
          const lastLetterDomRight = letters[
            letters.length - 1
          ].getBoundingClientRect().right;

          // if isnt space to fit another letter
          // aka causing the word to wrap
          newLeft = lastLetterDomRight - parentDom.x;
          if (
            parentDom.right - lastLetterDomRight <
            horizontalSpaceBetweenWords + 30
          ) {
            // FORCE NONO ENTER TYPE
            setEOL(true);
          }
          // else, shift the caret right
        } else {
          setEOL(false);
          const posLeft = letters[letterIdx].getBoundingClientRect().left;
          newLeft = posLeft - parentDom.x;
        }
        setCaretPos({marginLeft: newLeft - 3});
      }
    }
  }, [
    container,
    letterIdx,
    setCaretPos,
    setEOL,
    horizontalSpaceBetweenWords,
    wordIdx,
  ]);

  return (
    <div
      style={{
        height: '130px',
        width: '100%',
        display: 'flex',
        position: 'absolute',
      }}
    >
      <StyledCaret
        style={{
          ...caretPos,
          width: '4px',
          height: '25px',
          position: hasScrolled ? undefined : 'absolute',
          display: hasScrolled ? 'flex' : undefined,
          alignSelf: hasScrolled ? 'center' : undefined,
        }}
      />
    </div>
  );
};
