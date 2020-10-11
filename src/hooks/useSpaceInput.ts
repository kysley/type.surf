import Recoil from 'recoil';

import {
  testMods,
  testMeta,
  letterIndex,
  wordIndex,
  isCurrentWordCorrect,
  testHistory,
  testConditionsReport,
} from '../state';
import {useMods} from './useMods';

const {useRecoilValue, useRecoilCallback} = Recoil;

export function useSpaceInput() {
  const {conditions} = useMods({hook: 'Space'});

  const handleSpace = useRecoilCallback(
    ({snapshot, set, reset}) => async (endTest: any) => {
      const {wS, lI, w, tS, wI, wL, h, ...rest} = await snapshot.getPromise(
        testMeta,
      );

      const report = await snapshot.getPromise(testConditionsReport('Space'));

      const isCorrect = await snapshot.getPromise(isCurrentWordCorrect);
      console.log(isCorrect);

      const canContinue = conditions.some((condition) => {
        return condition.exec(wS, lI, w, tS, wI, wL, rest);
      });

      set(testHistory, (prev) => [...prev, isCorrect]);

      if (wI >= wL.length - 1) return;
      reset(letterIndex);
      set(wordIndex, (prev) => prev + 1);
    },
  );

  return {handleSpace};
}
