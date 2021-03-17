import type React from 'react';
import {useRecoilCallback} from 'recoil';

import {
  wordIndex,
  letterIndex,
  testHistory,
  testMeta,
  wordState,
  getKey,
  newWordState,
  back,
  forward,
  HasStartedState,
  EOWState,
  focusedState,
} from '../state';

function useTyping() {
  const inputHandler = useRecoilCallback(
    ({set, snapshot}) => async (
      e: React.KeyboardEvent<HTMLTextAreaElement>,
    ) => {
      const meta = await snapshot.getPromise(testMeta);
      const focused = await snapshot.getPromise(focusedState);
      const key = getKey(e);

      if (meta.testState === 'DONE' || !focused) return;
      if (e.location === 1 || e.location === 2) return;

      switch (e.code) {
        case 'Space': {
          const res = forward(meta);
          console.log(res.wordIndex);
          set(testHistory, res.history);
          set(wordIndex, res.wordIndex);
          set(letterIndex, res.letterIndex);
          if (res.EOW) {
            set(EOWState, res.EOW);
          }
          break;
        }
        case 'Backspace': {
          const ret = back(meta);
          set(letterIndex, ret.letterIndex);
          set(wordState(meta.wordIndex), ret.wordState);
          break;
        }
        default: {
          if (!meta.hasStarted) {
            set(HasStartedState, true);
          }
          if (!meta.eol) {
            const newWs = newWordState(key, meta);
            set(wordState(meta.wordIndex), newWs);
            set(letterIndex, (prev) => prev + 1);
          }
          break;
        }
      }
    },
    [],
  );

  return {inputHandler};
}

export default useTyping;
