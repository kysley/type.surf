import {useRecoilCallback} from 'recoil';
import {useMutation} from 'urql';

import type {
  WordsetMutation,
  WordsetMutationVariables,
} from '../graphql/gen/operations';
import {WORDSET} from '../graphql/mutations';
import {ModeState, OrbitState, wordList} from '../state';

export function useWordset() {
  const [, mut] = useMutation<WordsetMutation, WordsetMutationVariables>(
    WORDSET,
  );
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
      set(wordList, res.data?.wordset?.wordset?.split(',')!);
    },
    [mut],
  );

  return {
    getWordset,
  };
}
