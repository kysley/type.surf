import produce from 'immer';
import {atom, atomFamily, DefaultValue, selector, selectorFamily} from 'recoil';
import {v4 as uuid} from 'uuid';

export const wordList = atom<string[]>({
  key: 'wordList',
  default: [],
});

const wordWhereIndex = selectorFamily({
  key: 'wordWhereIndex',
  get: (index: number) => ({get}) => get(wordList)[index],
});

export const wordState = atomFamily<WordState[], number>({
  key: 'ws2',
  default: selectorFamily({
    key: 'ws2/default',
    get: (idx: number) => ({get}) => {
      const word = get(wordWhereIndex(idx)) || '';

      return word.split('').map((letter) => ({
        letter,
        input: '',
        match: 'WAIT',
        id: uuid(),
      }));
    },
  }),
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
    const w = get(wordWhereIndex(wI));
    const wS = get(wordState(wI));
    const tS = get(testTypingState);
    const h = get(testHistory);
    const eol = get(EOLState);
    const hasStarted = get(HasStartedState);

    return {
      letterIndex: lI,
      wordIndex: wI,
      word: w,
      wordState: wS,
      testState: tS,
      wordList: wL,
      history: h,
      eol,
      hasStarted,
    };
  },
});

export const testPunctuation = atom({
  key: 'testPunctuation',
  default: Boolean(localStorage.getItem('_ribbon_punctuation')) || false,
});

export const testHistory = atom<boolean[]>({
  key: 'testHistory',
  default: [],
});

export const historyWhereIndex = selectorFamily({
  key: 'historyWhereIndex',
  get: (index: number) => ({get}) => get(testHistory)[index],
});

//////////////////////////
//@ts-ignore
const localStorageEffect = (key: string) => ({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }
  //@ts-ignore
  onSet((newValue) => {
    if (newValue instanceof DefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

// // ====== Helpers ======

function toString(word: WordState[]) {
  return word.reduce((acc, w) => {
    if (w.input === w.letter) {
      acc += w.input;
    }
    return acc;
  }, '');
}

function compareWord(compare: string, to: string) {
  return compare === to;
}

export function getKey(e: React.KeyboardEvent) {
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
  EOW?: boolean;
};

export function forward(meta: testMeta): forwardReturn {
  const {word, history, wordIndex, wordState, wordList} = meta;
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

  if (wordIndex + 1 === wordList.length) {
    console.log('end of words');
    ret.wordIndex = wordIndex;
    ret.EOW = true;
  } else {
    ret.wordIndex = wordIndex + 1;
  }

  ret.letterIndex = 0;

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
      ret.wordState = produce(wordState, (draft) => {
        draft[0].match = 'WAIT';
        draft[0].input = '';
      });
      // letterIndex
    }
  }
  ret.letterIndex = produce(letterIndex, (draft) => {
    return draft > 0 ? draft - 1 : 0;
  });

  ret.eol = false;

  return ret as backReturn;
}

export const focusedState = atom({
  key: 'focusedState',
  default: false,
});

export const EOLState = atom({
  key: 'eolstate',
  default: false,
});

export const EOWState = atom({
  key: 'eowstate',
  default: false,
});

export const statsForNerds = selector({
  key: 'statsfornerds',
  get: ({get}) => {
    const position = get(wordIndex);
    const time = get(TimeEslapsedState);
    const history = get(testHistory);

    let wods = [];
    let corr = 0;
    let incorr = 0;
    for (let i = 0; i <= position + 1; i++) {
      const wod = get(wordState(i));
      wods.push(wod);
      for (let k = 0; k < wod.length; k++) {
        const lett = wod[k];
        if (lett.match === 'HIT') corr += 1;
        else if (lett.match === 'EXTRA' || lett.match === 'MISS') incorr += 1;
      }
    }
    const cpm = Math.floor((corr / time) * 60);
    const wpm = Math.floor(cpm / 5);

    const acc = Math.round(
      history.reduce((acc, bool) => {
        if (bool) acc += 1;
        return acc;
      }, 0) / position,
    );
    return {
      wpm: wpm || 0,
      cpm,
      incorr,
      acc,
    };
  },
});

export const OrbitState = atom({
  key: 'orbitstate',
  default: Number(localStorage.getItem('_surf.orbit')) || 30,
  effects_UNSTABLE: [localStorageEffect('_surf.orbit')],
});

export const ModeState = atom({
  key: 'modestate',
  default: localStorage.getItem('_surf.mode') || 'time',
  effects_UNSTABLE: [localStorageEffect('_surf.mode')],
});

export const HasStartedState = atom({
  key: 'hasstartedstate',
  default: false,
});

export const TimeEslapsedState = atom({
  key: 'timeeslapsedstate',
  default: 0,
});

export const TypingProgressState = selector({
  key: 'typingprogressstate',
  get: ({get}) => {
    const orbit = get(OrbitState);
    const mode = get(ModeState);
    const eslapsed = get(TimeEslapsedState);
    const wI = get(wordIndex);

    let val;
    if (mode === 'words') {
      val = `${orbit - wI} / ${orbit}`;
    } else {
      val = `${orbit - eslapsed}s`;
    }

    return val;
  },
});
