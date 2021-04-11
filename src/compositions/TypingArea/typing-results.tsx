import {ChevronBack, PlayBack, Share} from '@styled-icons/ionicons-outline';
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
      <ActionsGrid>
        <ActionButton onClick={repeat}>
          <PlayBack />
        </ActionButton>
        <ActionButton onClick={reset}>
          <ChevronBack />
        </ActionButton>
        <ActionButton onClick={reset}>
          <Share />
        </ActionButton>
      </ActionsGrid>
    </Container>
  );
}

const Container = styled('div', {
  display: 'flex',
  height: '300px',
  background: '$background2',
  padding: '2em',
  position: 'relative',
  justifyContent: 'space-between',
});

const StatsGrid = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr',
});

const StatTitle = styled('h3', {
  textTransform: 'uppercase',
  fontSize: '1.5rem',
  margin: 0,
});

const Stat = styled('span', {
  fontSize: '1.7rem',
});

const ActionsGrid = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr',
  gap: '2em',
  height: '100%',
  position: 'relative',
});

const ActionButton = styled('button', {
  background: '$secondary',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  borderRadius: '6px',
  color: '$text',
  padding: 0,

  '&:hover': {
    background: '$primary2',
  },
});
