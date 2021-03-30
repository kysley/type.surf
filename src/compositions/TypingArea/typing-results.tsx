import React from 'react';
import {useRecoilValue} from 'recoil';

import {useTypingControls} from '../../hooks/useTypingControls';
import {statsForNerds} from '../../state';
import {styled} from '../../styled';

export function TypingResults() {
  const stats = useRecoilValue(statsForNerds);
  const {repeat, reset} = useTypingControls();

  return (
    <Container>
      <StatsGrid>
        <div>
          <StatTitle>wpm</StatTitle>
          <Stat>{stats.wpm}</Stat>
        </div>
        <div>
          <StatTitle>accuracy</StatTitle>
          <Stat>{stats.acc}</Stat>
        </div>
      </StatsGrid>
      <div>
        <button onClick={repeat}>repeat</button>
        <button onClick={reset}>reset</button>
      </div>
    </Container>
  );
}

const Container = styled('div', {
  flex: 'fill',
  display: 'flex',
  height: '300px',
  background: '$background2',
  padding: '2em',
});

const StatsGrid = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '1fr 1fr 1fr',
});

const StatTitle = styled('h3', {
  textTransform: 'uppercase',
  fontSize: '1.5rem',
  margin: 0,
});

const Stat = styled('span', {
  fontSize: '1.7rem',
});
