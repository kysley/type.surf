import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  memo,
  useLayoutEffect,
} from 'react';
import styled from 'styled-components';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useSpring, animated} from 'react-spring';
import {ArrowDownCircle} from '@styled-icons/feather';

import {wordList, wordIndex, focusedState, renderRange} from '../../state';
import Word from '../../components/Word';
import {Caret} from '../../components/Caret';

const WordsWrapper = styled.div`
  opacity: 1;
  height: 130px;
  overflow: hidden;
  position: relative;
  display: flex;
  width: 100%;
`;

const WordsContainer = styled(animated.div)`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  user-select: none;
  position: absolute;
  outline: none;
`;

const WordsMix = () => {
  const [line, setLine] = useState(0);
  const words = useRecoilValue(renderRange);
  const setFocused = useSetRecoilState(focusedState);
  const [breaks, setBreaks] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const wI = useRecoilValue(wordIndex);
  const [top, set] = useSpring(() => ({top: 0}));

  const verticalDistanceBetweenWords = useMemo(() => {
    if (breaks.length && containerRef.current) {
      const id1 = breaks[0];
      const id2 = breaks[1];
      const xOne = containerRef.current?.children[id1].getBoundingClientRect()
        .y;
      const xTwo = containerRef.current?.children[id2].getBoundingClientRect()
        .y;

      return Math.abs(xOne - xTwo);
    }
    return 0;
  }, [breaks]);

  useEffect(() => {
    // reset the line tracker and top styling
    // this will probably break when you can backspace across words
    if (wI === 0) {
      set({top: 0});
      setLine(0);
    }
    // THE END OF THE LINE?
    const bumpOnIndex = breaks?.indexOf(wI) ?? -1;
    if (bumpOnIndex !== -1) {
      setLine((prev) => prev + 1);
    }
  }, [set, wI, breaks]);

  // only scroll if we are past the first line.
  // start on first line, caret moves to second line.
  // end of second line, we want to move the words up
  useLayoutEffect(() => {
    console.log(line);
    if (line > 1) set({top: -((line - 1) * verticalDistanceBetweenWords)});
  }, [line, set, verticalDistanceBetweenWords]);

  useLayoutEffect(() => {
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
      // if (breaks.length === 0 && indicesToScrollAt.length !== 0) {
      setBreaks(indicesToScrollAt);
      // }
    }
  }, [words]);

  const keyedWords = useMemo(() => {
    return words.map((word, idx) => word + idx);
  }, [words]);

  return (
    <WordsWrapper ref={viewportRef}>
      {words.length ? (
        <>
          <WordsContainer
            tabIndex={0}
            onBlur={() => setFocused(false)}
            onFocus={() => setFocused(true)}
            ref={containerRef}
            style={top}
          >
            {keyedWords.map((word, i) => (
              <Word key={word} i={i} />
            ))}
          </WordsContainer>
          <Caret
            container={containerRef}
            breaks={breaks}
            hasScrolled={line > 0}
          />
        </>
      ) : (
        <ArrowDownCircle />
      )}
    </WordsWrapper>
  );
};

export default WordsMix;
