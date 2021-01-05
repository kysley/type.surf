import React, {useEffect, useMemo} from 'react';
import {useSpring, animated} from 'react-spring';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {color} from 'styled-system';

import {EOLState} from '../state/state';
import {wordIndex, letterIndex} from '../state';
import {Box} from './Box';
import styled from 'styled-components';

const CaretBody = styled(animated.div)`
  ${color}
`;

const Xx = styled(animated.div)((props) => ({
  ...color(props),
  // color: 'red',
}));

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

  // We can't exactly guarantee that any 2 words will be on the same line
  const horizontalSpaceBetweenWords = useMemo(
    () =>
      Math.abs(
        (container?.current?.children[breaks[0]].getBoundingClientRect()
          .right || 30) -
          (container?.current?.children[breaks[0] + 1].getBoundingClientRect()
            .left || 20),
      ),
    [breaks, container],
  );

  // reset the caret position if wordIndex goes back to 0
  // this will probably break once we allow backspacing across words
  useEffect(() => {
    if (wordIdx === 0) setCaretPos({marginLeft: 0, top: 5});
  }, [setCaretPos, wordIdx]);

  useEffect(() => {
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
        setCaretPos({marginLeft: newLeft});
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
    <Xx
      bg="caret"
      style={{
        ...caretPos,
        // background: 'blue',
        // opacity: 0.3,
        width: '4px',
        height: '25px',
        position: hasScrolled ? undefined : 'absolute',
        display: hasScrolled ? 'flex' : undefined,
        alignSelf: hasScrolled ? 'center' : undefined,
      }}
    />
  );
};
