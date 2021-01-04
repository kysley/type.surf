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
    const bumpOnIndex = breakRef.current?.indexOf(wI) ?? -1;
    console.log(bumpOnIndex);
    if (bumpOnIndex !== -1) {
      setLine((prev) => prev + 1);
    }
  }, [set, wI]);

  useEffect(() => {
    if (line > 1) set({top: -((line - 1) * getVerticalDistanceBetweenWords())});
  }, [line, set]);

  useEffect(() => {
    const indicesToScrollAt: number[] = [];
    if (containerRef.current) {
      const domWords = [...containerRef.current.children];
      let prev = 0;
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
