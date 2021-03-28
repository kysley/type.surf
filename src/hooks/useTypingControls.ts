import {useRecoilCallback} from 'recoil';

import {
  EOLState,
  letterIndex,
  testHistory,
  testTypingState,
  wordIndex,
  wordState,
} from '../state';
import {useWordset} from './useWordset';

export function useTypingControls() {
  const {getWordset} = useWordset();

  const repeat = useRecoilCallback(
    ({snapshot, reset}) => async () => {
      const wI = await snapshot.getPromise(wordIndex);
      for (let i = 0; i <= wI + 1; i++) {
        reset(wordState(i));
      }

      reset(wordIndex);
      reset(letterIndex);
      reset(EOLState);
      reset(testHistory);
      reset(testTypingState);
    },
    [],
  );

  const reset = useRecoilCallback(
    ({snapshot, reset, set}) => async () => {
      await repeat();
      getWordset();
    },
    [getWordset, repeat],
  );

  return {
    reset,
    repeat,
  };
}
