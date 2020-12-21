import Recoil from 'recoil';
import {v4 as uuid} from 'uuid';

const {atom, atomFamily, selector, selectorFamily} = Recoil;

async function getWords() {
  return new Promise<string>((resolve) =>
    setTimeout(
      resolve(
        'ONe|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|sevenone|two|three|four|five|six|seven',
      ),
      500,
    ),
  ).then((res) => res.split('|'));
}

export const wordSetOptionsFromState = selector({
  key: 'wordSetOptions',
  get: ({get}) => {
    const slug = get(testDuration);
    const mode = get(testMode);

    if (mode === 'words') {
    }
  },
});

export const wordList = atom({
  key: 'wordList',
  default: selector({
    key: '1/default',
    get: async () => {
      const res = await getWords();
      return res;
    },
  }),
});

export const wordFromIndex = selectorFamily({
  key: 'wordFromIndex',
  get: (index: number) => ({get}) => get(wordList)[index],
});

export const wordStateOld = atomFamily<
  WordState[],
  {word: string; index: number}
>({
  key: 'wordState',
  default: ({word, index}) =>
    word.split('').map((letter) => ({
      letter,
      input: '',
      match: 'WAIT',
      id: uuid(),
    })),
});

const wordWhereIndex = selectorFamily({
  key: 'wordWhereIndex',
  get: (index: number) => ({get}) => get(wordList)[index],
});

const historyWhereIndex = selectorFamily({
  key: 'historyWhereIndex',
  get: (index: number) => ({get}) => get(testHistory)[index],
});

export const wordState = atomFamily<WordState[], number>({
  key: 'ws2',
  default: selectorFamily({
    key: 'ws2/default',
    get: (idx: number) => ({get}) => {
      const word = get(wordWhereIndex(idx));
      // console.log(word);

      return word.split('').map((letter) => ({
        letter,
        input: '',
        match: 'WAIT',
        id: uuid(),
      }));
    },
  }),
});

export const wordStateWhereIndex = selectorFamily({
  key: 'wordStateWhereIndex',
  get: (index: number) => ({get}) => {
    return get(wordState(index));
  },
});

export const wordIndex = atom({
  key: 'wordIndex',
  default: 0,
});

export const letterIndex = atom({
  key: 'letterIndex',
  default: 0,
});

export const testTypingState = atom<TestState>({
  key: 'testState',
  default: 'WAITING',
});

export const testMeta = selector<testMeta>({
  key: 'gameState',
  get: ({get}) => {
    const wL = get(wordList);
    const lI = get(letterIndex);
    const wI = get(wordIndex);
    const w = get(wordFromIndex(wI));
    const wS = get(wordState(wI));
    const tS = get(testTypingState);
    const h = get(testHistory);

    return {
      letterIndex: lI,
      wordIndex: wI,
      word: w,
      wordState: wS,
      testState: tS,
      wordList: wL,
      history: h,
    };
  },
});

export const currentWord = selector({
  key: 'currentWord',
  get: ({get}) => {
    // const wI = get(wordIndex);
    return get(wordFromIndex(get(wordIndex)));
    // return w;
  },
});

export const testMods = atom<Mod[]>({
  key: 'testMods',
  default: [],
});

export const modsFromHook = selectorFamily({
  key: 'modsFromHook',
  get: (hook: Hooks) => ({get}) => {
    const mods = get(testMods);
    const conditions = mods.filter((mod) => mod.condition && mod.hook === hook);
    return {conditions};
  },
});

export const testTime = atom({
  key: 'testTime',
  default: 60,
});

export const testDuration = atom({
  key: 'testDuration',
  default: Number(localStorage.getItem('_ribbon_duration')) || 60,
});

export const testPunctuation = atom({
  key: 'testPunctuation',
  default: Boolean(localStorage.getItem('_ribbon_punctuation')) || false,
});

export const testMode = atom({
  key: 'testMode',
  default: localStorage.getItem('_ribbon_mode') ?? 'words',
});

export const testHistory = atom<boolean[]>({
  key: 'testHistory',
  default: [],
});

export const historyFromIndex = selectorFamily({
  key: 'historyFromIndex',
  get: (index: number) => ({get}) => get(testHistory)[index],
});

export const isCurrentWordCorrect = selector({
  key: 'isCurrentWordCorrect',
  get: ({get}) =>
    get(wordState(get(wordIndex))).every(
      (letter) => letter.letter === letter.input,
    ),
});

export const testConditionsReport = selectorFamily({
  key: 'testConditionsReport',
  get: (hook: Hooks) => ({get}) => {
    const meta = get(testMeta);
    const {conditions} = get(modsFromHook(hook));

    const report = conditions.reduce(
      (acc, condition) => {
        const result = condition.exec({...meta});
        if (!result && condition.terminating) acc.terminate = true;
        if (!result) acc.failed = true;
        return acc;
      },
      {terminate: false, failed: false},
    );
    return report;
  },
});
