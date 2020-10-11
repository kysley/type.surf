import React from 'react';
import Recoil from 'recoil';

import {testMods, testTime, testTypingState, testDuration} from '../state';
import {modDict} from '../mods';

const {useRecoilState, useRecoilValue} = Recoil;

const Debug = () => {
  const [mods, setMods] = useRecoilState(testMods);
  const handleModLoad = (modName: string) => {
    const modPkg = modDict[modName];
    if (mods.includes(modPkg)) {
      setMods((prev) => prev.filter((mod) => mod !== modPkg));
    } else {
      setMods((prev) => [...prev, modPkg]);
    }
  };
  const duration = useRecoilValue(testDuration);
  const time = useRecoilValue(testTime);
  const typingState = useRecoilValue(testTypingState);

  return (
    <div>
      <span>
        {time}/{duration},{typingState}
      </span>
      <ul>
        {mods.map((mod) => (
          <li key={mod.key}>{mod.key}</li>
        ))}
      </ul>
      <button onClick={() => handleModLoad('perfectionist')}>
        toggle perfectionist
      </button>
      <button onClick={() => handleModLoad('noBackspace')}>
        toggle no backspace
      </button>
    </div>
  );
};

export default Debug;
