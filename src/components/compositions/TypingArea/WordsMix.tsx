import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import {useRecoilValue} from 'recoil';
import {useSpring, animated} from 'react-spring';

import {wordList, wordIndex, letterIndex} from '../../../state';
import Word from '../../Word';

const BUMP_PX = 30;

const WordsWrapper = styled.div`
  opacity: 1;
  height: 93px;
  overflow: hidden;
  grid-area: typing;
  position: relative;
`;

const WordsContainer = styled(animated.div)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: flex-start;
  user-select: none;
  position: absolute;
  outline: none;
  padding-top: 22px;
`;

const WordsMix = ({callback}: any) => {
  const words = useRecoilValue(wordList);
  const containerRef = useRef<HTMLDivElement>(null);
  const wI = useRecoilValue(wordIndex);
  const lI = useRecoilValue(letterIndex);
  const [top, set] = useSpring(() => ({top: 0}));
  const [caretPos, setCaretPos] = useSpring(() => ({
    left: 0,
    top: 20,
    config: {duration: 150},
  }));

  useEffect(() => {
    const indicesToScrollAt: number[] = [];
    if (containerRef.current) {
      const words = [...containerRef.current.children];
      let prev = 0;
      words.forEach((self, idx) => {
        const cur = self.getBoundingClientRect().top;
        if (cur !== prev) {
          prev = cur;
          if (idx !== 0) indicesToScrollAt.push(idx);
        }
      });
    }

    // Check if we are bumping at the current Index
    const bumpOnIndex = indicesToScrollAt.indexOf(wI);

    // Check if we should have bumped at the previous index
    // but didnt bump because the line overflowed due to EXTRA characters
    const bumpOnPrevious = indicesToScrollAt.indexOf(wI - 1);

    // If either case is true
    if (bumpOnIndex !== -1 || bumpOnPrevious !== -1) {
      let rowMult;
      // Should have bumped on the previous index,
      if (bumpOnIndex === -1) {
        rowMult = bumpOnPrevious;
      } else {
        // We are bumping on the current index
        rowMult = bumpOnIndex;
      }

      // Add one to the multiplier since we are dealing with array indices. Bumping at [1] means this is the second
      // bump to take place
      rowMult++;
      set({top: rowMult * BUMP_PX * -1});
      setCaretPos({top: 20, left: 0});
    }
  }, [wI]);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.getBoundingClientRect();
      const word = containerRef.current.children[wI];

      if (word) {
        let newLeft;
        let newTop = 20;
        const letters = word.children;

        // We only need to check the possibility of changing the caret height if there are EXTRA characters
        if (lI >= letters.length) {
          const pos = letters[letters.length - 1].getBoundingClientRect();
          newLeft = pos.right - parent.x;

          // Get the rect for the current letter that is being typed
          const currentLetter = letters[
            letters.length - 1
          ].getBoundingClientRect();

          // Get the rect for the first letter of the previous word, or if this is the first index
          // set it to the current letter for simplicity
          // There is still the edge case that a person may fill up an entire line with incorrect characters on the first word...
          const previousWordFirstLetter =
            containerRef.current.children[
              wI - 1
            ]?.children[0].getBoundingClientRect() || currentLetter;

          if (currentLetter.top !== previousWordFirstLetter.top) {
            newTop = newTop + BUMP_PX;
          }
        } else {
          const pos = letters[lI].getBoundingClientRect();
          newLeft = pos.left - parent.x;
        }
        setCaretPos({left: newLeft, top: newTop});
      }
    }
  }, [wI, lI]);

  return (
    <WordsWrapper>
      <animated.div
        style={{
          ...caretPos,
          background: 'black',
          width: '4px',
          height: '25px',
          position: 'absolute',
          animationDuration: '100',
        }}
      ></animated.div>
      <WordsContainer
        tabIndex={0}
        onBlur={() => callback(false)}
        onFocus={() => callback(true)}
        ref={containerRef}
        style={top}
      >
        {words.map((word, i) => (
          <Word key={i} i={i} />
        ))}
      </WordsContainer>
    </WordsWrapper>
  );
};

export default WordsMix;
