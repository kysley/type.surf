import {useRecoilCallback} from 'recoil';

import {useWordsetMutation} from '../graphql/gen';
import {ModeState, OrbitState, wordList} from '../state';

export function useWordset() {
  const [, mut] = useWordsetMutation();
  const getWordset = useRecoilCallback(
    ({snapshot, reset, set}) => async () => {
      const orbit = await snapshot.getPromise(OrbitState);
      const mode = await snapshot.getPromise(ModeState);
      let res;
      if (mode === 'words') {
        res = await mut({length: orbit});
      } else {
        res = await mut({length: 300});
      }
      set(wordList, res.data?.Wordset?.wordset?.split(',')!);
    },
    [mut],
  );

  return {
    getWordset,
  };
}
