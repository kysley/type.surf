import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import {useRecoilValue} from 'recoil';
import {useSpring, animated} from 'react-spring';

import {wordList, wordIndex} from '../../../state';
import Word from '../../Word';
import {Caret} from '../../../components/Caret';

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
  const breakRef = useRef<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const wI = useRecoilValue(wordIndex);
  const [top, set] = useSpring(() => ({top: 0}));

  useEffect(() => {
    const bumpOnIndex = breakRef.current.indexOf(wI);
    if (bumpOnIndex !== -1) {
      set({top: -((bumpOnIndex + 1) * BUMP_PX)});
    }
  }, [set, wI]);

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
    <WordsWrapper>
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
      <Caret container={containerRef} breaks={breakRef.current} />
    </WordsWrapper>
  );
};

export default WordsMix;
