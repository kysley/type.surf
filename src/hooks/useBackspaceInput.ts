import Recoil from 'recoil';

import {
  testMods,
  testMeta,
  letterIndex,
  wordState,
  modsFromHook,
  testTypingState,
  testTime,
} from '../state';
import {replaceAt} from '../utils/replaceAt';
import {useMods} from './useMods';

const {useRecoilValue, useRecoilCallback, useSetRecoilState} = Recoil;

export function useBackspaceInput() {
  // const {conditions: c} = useMods({hook: 'Backspace'});
  // const {conditions: c} = useRecoilValue(modsFromHook('Backspace'));

  const handleBackspace = useRecoilCallback(
    ({snapshot, set, reset}) => async () => {
      const {wS, lI, w, tS, wI, ...rest} = await snapshot.getPromise(testMeta);
      const {conditions} = await snapshot.getPromise(modsFromHook('Backspace'));

      // console.log(c);

      const canContinue = conditions.every((condition) => {
        return condition.exec(wS, lI, w, tS, rest);
      });

      if (canContinue === false) return;

      if (tS === 'WAITING') return;

      let newWordState: WordState[];

      if (lI > w.length) {
        const ret = wS.slice(0);
        ret.pop();
        newWordState = ret;
      } else {
        newWordState = replaceAt<WordState>(wS, lI - 1, {
          ...wS[lI - 1],
          match: 'WAIT',
          input: '',
        });
      }

      if (lI > 0) {
        set(letterIndex, (prev) => prev - 1);
      }

      set(wordState(wI), newWordState);
    },
  );

  return {handleBackspace};
}
