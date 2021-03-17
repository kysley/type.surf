import React, {useEffect} from 'react';
import {useRecoilCallback} from 'recoil';

import {getInputCategory} from '../utils/getInputCategory';
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

interface useTypingProps {
  ref?: React.RefObject<any>;
  when?: boolean;
}

function useTyping({ref, when = true}: useTypingProps) {
  const handleRecoil = useRecoilCallback(
    ({set, snapshot}) => async (e: KeyboardEvent) => {
      const meta = await snapshot.getPromise(testMeta);
      const focused = await snapshot.getPromise(focusedState);
      const cat = getInputCategory(e);
      const key = getKey(e);

      if (meta.testState === 'DONE' || !focused) return;

      switch (cat) {
        case 'AZ09': {
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
        case 'Backspace': {
          const ret = back(meta);
          set(letterIndex, ret.letterIndex);
          set(wordState(meta.wordIndex), ret.wordState);
          break;
        }
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
        default:
          console.warn('insupposed input category', e.key);
          break;
      }
    },
    [],
  );

  useEffect(() => {
    if (when) {
      document.addEventListener('keydown', handleRecoil);
    }

    return () => {
      document.removeEventListener('keydown', handleRecoil);
    };
  }, [handleRecoil, when]);
  return null;
}

export default useTyping;
