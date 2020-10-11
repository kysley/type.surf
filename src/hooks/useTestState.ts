import type {MutationWordsetArgs} from '../graphql/gen/schemas';
import type {WordsetMutation} from '../graphql/gen/operations';
import {useMutation} from 'urql';
import Recoil from 'recoil';

import {WORDSET} from '../graphql/mutations/wordset';
import {wordList, wordState, testTypingState, testTime, wordIndex, letterIndex, testHistory} from '../state';

const {
  useSetRecoilState,
  useRecoilState,
  useRecoilCallback,
  useResetRecoilState,
  useRecoilValue,
} = Recoil;


export function useTestState() {
  const [, fetch] = useMutation<WordsetMutation, MutationWordsetArgs>(WORDSET);
  const [wL, set] = useRecoilState(wordList);

  const resetWordState = useRecoilCallback(({reset, snapshot}) => async () => {
    // const words = await snapshot.getPromise(wordList);

    const len = wL.length;
    console.log(len);

    for (let i = wL.length; i--; i >= 0) {
      reset(wordState(i));
    }

    reset(testTypingState);
    reset(testTime);
    reset(wordIndex);
    reset(letterIndex);
    reset(testHistory);
  });

  const loadNewTest = async () => {
    const {data, error} = await fetch();

    if (!error && data?.wordset) {
      console.log('fetch complete');

      await resetWordState();
      set(data.wordset.split('|'));
    }
  };

  return {loadNewTest, resetWordState};
}
