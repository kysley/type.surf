import React, {useEffect, useMemo} from 'react';
import {useSpring, animated} from 'react-spring';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {EOLState} from '../state/state';
import {wordIndex, letterIndex} from '../state';

export const Caret = ({
  container,
  breaks,
}: {
  container: React.RefObject<HTMLDivElement>;
  breaks: number[];
}) => {
  const setEOL = useSetRecoilState(EOLState);
  const wordIdx = useRecoilValue(wordIndex);
  const letterIdx = useRecoilValue(letterIndex);
  const [caretPos, setCaretPos] = useSpring(() => ({
    left: 0,
    top: 20,
    config: {duration: 150},
  }));

  const spaceBetweenWords = useMemo(
    () =>
      Math.abs(
        (container?.current?.children[breaks[0]].getBoundingClientRect()
          .right || 30) -
          (container?.current?.children[breaks[0] + 1].getBoundingClientRect()
            .left || 20),
      ),
    [breaks, container],
  );

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

          // there isnt space to fit another word
          if (parentDom.right - lastLetterDomRight < spaceBetweenWords + 30) {
            newLeft = lastLetterDomRight - parentDom.x;
            setEOL(true);
            // FORCE NONO ENTER TYPE
          } else {
            newLeft = lastLetterDomRight - parentDom.x;
          }
        } else {
          setEOL(false);
          const posLeft = letters[letterIdx].getBoundingClientRect().left;
          newLeft = posLeft - parentDom.x;
        }
        setCaretPos({left: newLeft});
      }
    }
  }, [container, letterIdx, setCaretPos, setEOL, spaceBetweenWords, wordIdx]);

  return (
    <animated.div
      style={{
        ...caretPos,
        background: 'blue',
        opacity: 0.3,
        width: '4px',
        height: '25px',
        position: 'absolute',
        animationDuration: '100',
      }}
    ></animated.div>
  );
};
