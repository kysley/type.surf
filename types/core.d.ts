type MatchState = 'MISS' | 'HIT' | 'WAIT' | 'EXTRA';

type TestState = 'WAITING' | 'DONE' | 'STARTED';

type WordState = {
  readonly letter: string;
  input: string;
  match: MatchState;
  readonly id: string;
};

type Hooks = 'AZ09' | 'Backspace' | 'Space' | 'TimeUp' | 'GameEnd';

type Mod = {
  key: string;
  hook: Hooks;
  exec: (...args) => any;
  condition?: boolean;
  terminating?: boolean;
};

type testMeta = {
  wordList: string[];
  letterIndex: number;
  wordIndex: number;
  word: string;
  wordState: WordState[];
  testState: TestState;
  history: boolean[];
  eol: boolean;
};
