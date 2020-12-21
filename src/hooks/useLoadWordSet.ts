// import {useSetRecoilState} from 'recoil';
// import {useMutation} from 'urql';

// import {wordList} from '../state';
// import type {WordsetMutation} from '../graphql/gen/operations';
// import type {MutationWordsetArgs} from '../graphql/gen/schemas';
// import {WORDSET} from '../graphql/mutations/wordset';
// import {useCallback} from 'react';

// export function useLoadWordSet(optionsOverride?: MutationWordsetArgs) {
//   const [result, fetch] = useMutation<WordsetMutation, MutationWordsetArgs>(
//     WORDSET,
//   );
//   const setWordList = useSetRecoilState(wordList);

//   const fetchAndSet = useCallback(async () => {
//     const res = await fetch(optionsOverride);
//     if (res.error) {
//       // noop for now
//     } else {
//       setWordList(res.data!.wordset!.split('|'));
//     }
//   }, [fetch, optionsOverride, setWordList]);

//   return {
//     fetchAndSet,
//     result,
//   };
// }
export {};
