import React from 'react';
import {useRecoilValue} from 'recoil';

import {useTypingControls} from '../../hooks/useTypingControls';
import {statsForNerds} from '../../state';
import {Box} from '../../components/Box';

export function TypingResults() {
  const stats = useRecoilValue(statsForNerds);
  const {repeat, reset} = useTypingControls();

  return (
    <Box flex="fill">
      <span>{stats.wpm}</span>
      <span>{stats.acc}</span>
      <button onClick={repeat}>repeat</button>
      <button onClick={reset}>reset</button>
    </Box>
  );
}
