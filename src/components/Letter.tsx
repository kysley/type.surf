import React, {memo} from 'react';
import styled from 'styled-components';

function map(state: MatchState): string | Error {
  if (state === 'HIT') return 'var(--hit-color)';
  if (state === 'MISS') return 'var(--miss-color)';
  if (state === 'WAIT') return 'var(--wait-color)';
  if (state === 'EXTRA') return 'var(--extra-color)';
  return Error('Invalid Match. Expected typeof Match, but got: ' + state);
}

const Char = styled.span<{match: MatchState}>`
  color: ${({match}) => map(match) as string};
`;

const Letter: React.FC<{self: WordState}> = ({self}) => {
  return (
    <Char match={self.match} key={self.id}>
      {self.letter !== '' ? self.letter : self.input}
    </Char>
  );
};

export default memo(Letter);
