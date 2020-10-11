import React, {useEffect, useCallback, useRef, useLayoutEffect} from 'react';
import Recoil from 'recoil';
import {v4 as uuid} from 'uuid';
import timer from 'use-timer';

import {getInputCategory} from '../utils/getInputCategory';
import {useAlphaNumericInput} from './useAlphaNumericInput';
import {useSpaceInput} from './useSpaceInput';
import {useBackspaceInput} from './useBackspaceInput';
import {
  testTime,
  testTypingState,
  testDuration,
  wordIndex,
  letterIndex,
  testHistory,
} from '../state';
import {useMods} from './useMods';
import {useTestState} from './useTestState';

const {
  useSetRecoilState,
  useRecoilCallback,
  useRecoilValue,
  useRecoilState,
} = Recoil;

interface useTypingProps {
  ref?: React.RefObject<any>;
  when?: boolean;
}

const useTyping = ({ref, when = true}: useTypingProps) => {
  const {handleAZ09} = useAlphaNumericInput();
  const {handleSpace} = useSpaceInput();
  const {handleBackspace} = useBackspaceInput();
  const initialTime = useRecoilValue(testDuration);
  const setTestTime = useSetRecoilState(testTime);
  const {loadNewTest, resetWordState} = useTestState();
  // const mode = useRecoilValue(testNM);

  const {time, start: startTimer, pause, reset: resetTimer} = timer.useTimer({
    timerType: 'DECREMENTAL',
    initialTime: initialTime,
    endTime: 0,
    onTimeUpdate: (time) => setTestTime(time),
  });

  useEffect(() => {
    if (time === 0) {
      endTest();
    }
  }, [time]);

  const startTest = useRecoilCallback(({snapshot, set, reset}) => async () => {
    reset(testTime);
    set(testTypingState, 'STARTED');
    startTimer();
  });

  const endTest = useRecoilCallback(({snapshot, set, reset}) => async () => {
    // reset(testTime);
    set(testTypingState, 'DONE');
    // resetTimer();
  });

  // const resetTest = useRecoilCallback(({snapshot, set, reset}) => async () => {
  //   reset(testTypingState);
  //   reset(testTime);
  //   reset(wordIndex);
  //   reset(letterIndex);
  //   reset(testHistory);
  //   resetTimer();
  // });

  const handle = useCallback((e: KeyboardEvent) => {
    const cat = getInputCategory(e);
    // console.log(cat);

    switch (cat) {
      case 'AZ09':
        handleAZ09(e, startTest);
        break;
      case 'Backspace':
        handleBackspace();
        break;
      case 'Space':
        handleSpace(endTest);
        break;
      default:
        console.warn('insupposed input category', e.key);
        break;
    }
  }, []);

  useEffect(() => {
    if (when) {
      document.addEventListener('keydown', handle);
    }

    return () => {
      document.removeEventListener('keydown', handle);
    };
  }, [when]);

  return {
    startTest,
    endTest,
    // resetTest,
    resetTimer,
  };
};

export default useTyping;
