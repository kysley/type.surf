import {useRecoilCallback, useRecoilState, useResetRecoilState} from 'recoil';

import {
  letterIndex,
  testTime,
  testTypingState,
  wordList,
  wordIndex,
  testHistory,
  wordState,
} from '../state';
import {useLoadWordSet} from './useLoadWordSet';

export function useResetTest() {
  const [wordListState, setWordList] = useRecoilState(wordList);
  const {fetchAndSet} = useLoadWordSet();

  // const [] = useResetRecoilState(wordIndex);
  // const [] = useResetRecoilState(letterIndex);
  // const [] = useResetRecoilState(letterIndex);

  const resetTestStates = useRecoilCallback(({reset, snapshot}) => async () => {
    // const words = await snapshot.getPromise(wordList);

    const len = wordListState.length;
    console.log(len);

    for (let i = wordListState.length; i--; i >= 0) {
      reset(wordState(i));
    }

    reset(testHistory);
    reset(wordIndex);
    reset(letterIndex);
    reset(testTypingState);
    reset(testTime);
    fetchAndSet();
  });

  return {
    resetTestStates,
  };
}
