const exec = (snapshot: any) => {
  const {wS, lI, w, tS, wI} = snapshot;

  let passes;

  passes = wI > 1 && wS.every((letter: any) => letter.letter === letter.input);

  return passes;
};

const perfectionistPkg: Mod = {
  key: 'perfectionist',
  hook: 'Space',
  exec,
  condition: true,
  terminating: true,
};

export default perfectionistPkg;
