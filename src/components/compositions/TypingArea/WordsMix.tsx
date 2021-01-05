import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useSpring, animated} from 'react-spring';

import {wordList, wordIndex} from '../../../state';
import Word from '../../Word';
import {Caret} from '../../../components/Caret';
import {focusedState} from '../../../state/state';

const BUMP_PX = 30;

const WordsWrapper = styled.div`
  opacity: 1;
  height: 121px;
  overflow: hidden;
  grid-area: typing;
  position: relative;
  display: flex;
`;

const WordsContainer = styled(animated.div)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: flex-start;
  user-select: none;
  position: absolute;
  outline: none;
  /* padding-top: 22px; */
`;

const WordsMix = () => {
  const [line, setLine] = useState(0);
  const words = useRecoilValue(wordList);
  const setFocused = useSetRecoilState(focusedState);
  const breakRef = useRef<number[]>();
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const wI = useRecoilValue(wordIndex);
  const [top, set] = useSpring(() => ({top: 0}));

  // I read somewhere that getBoundingClientRect().value
  // reads from a cached copy, so this wouldnt cause reflow?
  const getVerticalDistanceBetweenWords = () => {
    if (breakRef.current && containerRef.current) {
      const id1 = breakRef.current[0];
      const id2 = breakRef.current[1];
      const xOne = containerRef.current?.children[id1].getBoundingClientRect()
        .y;
      const xTwo = containerRef.current?.children[id2].getBoundingClientRect()
        .y;

      return Math.abs(xOne - xTwo);
    }
    return 0;
  };

  useEffect(() => {
    // reset the line tracker and top styling
    // this will probably break when you can backspace across words
    if (wI === 0) {
      set({top: 0});
      setLine(0);
    }
    // THE END OF THE LINE?
    const bumpOnIndex = breakRef.current?.indexOf(wI) ?? -1;
    if (bumpOnIndex !== -1) {
      setLine((prev) => prev + 1);
    }
  }, [set, wI]);

  // only scroll if we are past the first line.
  // start on first line, caret moves to second line.
  // end of second line, we want to move the words up
  useEffect(() => {
    if (line > 1) set({top: -((line - 1) * getVerticalDistanceBetweenWords())});
  }, [line, set]);

  useEffect(() => {
    const indicesToScrollAt: number[] = [];
    if (containerRef.current) {
      const domWords = [...containerRef.current.children];
      let prev = 0;
      // if the next word doesnt have the same top value, thats a break point to scroll at
      domWords.forEach((self, idx) => {
        const cur = self.getBoundingClientRect().top;
        if (cur !== prev) {
          prev = cur;
          if (idx !== 0) indicesToScrollAt.push(idx);
        }
      });
    }
    breakRef.current = indicesToScrollAt;
  }, [wI]);

  return (
    <WordsWrapper ref={viewportRef} tabIndex={1}>
      <WordsContainer
        tabIndex={0}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        ref={containerRef}
        style={top}
      >
        {words.map((word, i) => (
          <Word key={i} i={i} />
        ))}
      </WordsContainer>
      <Caret
        container={containerRef}
        breaks={breakRef.current}
        hasScrolled={line > 0}
      />
    </WordsWrapper>
  );
};

export default WordsMix;
