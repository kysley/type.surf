import {atom} from 'recoil';
import {v4 as uuid} from 'uuid';
import produce from 'immer';

// import {wordList} from '.';

// // ====== Helpers ======

function toString(word: WordState[]) {
  return word.map((w) => w.letter).join('');
}

function compareWord(compare: string, to: string) {
  return compare === to;
}

export function getKey(e: KeyboardEvent) {
  return e.key;
}

export function newWordState(key: string, meta: testMeta): WordState[] {
  const {letterIndex, wordState} = meta;

  if (letterIndex > wordState.length - 1) {
    return produce(wordState, (draft) => {
      draft.push({letter: '', input: key, match: 'EXTRA', id: uuid()});
    });
  } else {
    const match = wordState[letterIndex].letter === key ? 'HIT' : 'MISS';
    return produce(wordState, (draft) => {
      draft[letterIndex].input = key;
      draft[letterIndex].match = match;
    });
  }
}

type forwardReturn = {
  history: boolean[];
  wordIndex: number;
  letterIndex: number;
};

export function forward(meta: testMeta): forwardReturn {
  const {word, history, wordIndex, wordState} = meta;
  const ret: any = {};

  if (compareWord(word, toString(wordState))) {
    ret.history = produce(history, (draft) => {
      draft.push(true);
    });
  } else {
    ret.history = produce(history, (draft) => {
      draft.push(false);
    });
  }

  ret.letterIndex = 0;
  ret.wordIndex = wordIndex + 1;

  return ret as forwardReturn;
}

type backReturn = {letterIndex: number; wordState: WordState[]};
export function back(meta: testMeta): backReturn {
  const {letterIndex, word, wordState} = meta;
  const ret: any = {};

  if (letterIndex > word.length) {
    ret.wordState = produce(wordState, (draft) => {
      draft.pop();
    });
  } else {
    if (letterIndex - 1 >= 0) {
      ret.wordState = produce(wordState, (draft) => {
        draft[letterIndex - 1].match = 'WAIT';
        draft[letterIndex - 1].input = '';
      });
    } else {
      ret.wordState = wordState;
    }
  }
  ret.letterIndex = produce(letterIndex, (draft) => {
    return draft > 0 ? draft - 1 : 0;
  });

  ret.eol = false;

  return ret as backReturn;
}

// // ====== Atoms ======

// export const wordSetState = atom({
//   key: 'wordSetState',
//   default: '',
// });

// export const wordIndex = atom({
//   key: 'wordIndex',
//   default: 0,
// });

// export const letterIndex = atom({
//   key: 'letterIndex',
//   default: 0,
// });

// export const wordState = atomFamily({
//   key: 'wordState',
//   default: selectorFamily({
//     key: 'wordState/default',
//     get: (index: number) => ({get}) => {
//       return get(wordSet)
//         [index].split('')
//         .map((letter) => ({
//           letter,
//           input: '',
//           match: 'WAIT',
//           id: uuid(),
//         }));
//     },
//   }),
// });

// export const userInputHistory = atom({
//   key: 'userhistory',
//   default: [],
// });

// // ====== Selectors ======
// export const wordSet = selector({
//   key: 'wordSet',
//   get: ({get}) => get(wordSetState).split('|'),
// });

// export const wordWhereIndex = selectorFamily({
//   key: 'wordwhereindex',
//   get: (index: number) => ({get}) => {
//     return get(wordSet)[index];
//   },
// });

// export const wordStateWhereIndex = selectorFamily({
//   key: 'wordStateWhereIndex',
//   get: (index: number) => ({get}) => {
//     return get(wordState(index));
//   },
// });

// export const userInputHistoryWhereIndex = selectorFamily({
//   key: 'userInputHistoryWhereIndex',
//   get: (index: number) => ({get}) => {
//     return get(userInputHistory)[index];
//   },
// });

// // export const userInputHistoryBoolean;

// // export const isWordCorrectWhereIndex = selectorFamily({

// // })
export const focusedState = atom({
  key: 'focusedState',
  default: false,
});

export const EOLState = atom({
  key: 'eolstate',
  default: false,
});

export const contextualWindowState = atom({
  key: 'contextualwindowstate',
  default: false,
});
