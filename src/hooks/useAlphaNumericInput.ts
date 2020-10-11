import Recoil from 'recoil';
import {v4 as uuid} from 'uuid';

import {
  testMods,
  testMeta,
  testTypingState,
  letterIndex,
  wordState,
} from '../state';
import {replaceAt} from '../utils/replaceAt';

const {useRecoilValue, useRecoilCallback} = Recoil;

export function useAlphaNumericInput() {
  const handleAZ09 = useRecoilCallback(
    ({snapshot, set}) => async (e: KeyboardEvent, startTest: any) => {
      const {wS, lI, w, tS, wI} = await snapshot.getPromise(testMeta);

      if (tS === 'WAITING') {
        startTest();
      }

      let newWordState: WordState[];

      if (lI + 1 > w.length) {
        newWordState = [
          ...wS,
          {
            letter: '',
            input: e.key,
            match: 'EXTRA',
            id: uuid(),
          },
        ];
      } else {
        const lettermatchState: MatchState =
          e.key === wS[lI].letter ? 'HIT' : 'MISS';
        newWordState = replaceAt<WordState>(wS, lI, {
          ...wS[lI],
          input: e.key,
          match: lettermatchState,
        });
      }

      set(letterIndex, (prev) => prev + 1);
      set(wordState(wI), newWordState);
    },
  );

  return {handleAZ09};
}
