import React, {memo} from 'react';
import styled from 'styled-components';
import {color} from 'styled-system';

function map(state: MatchState): string | undefined {
  if (state === 'HIT') return 'text';
  if (state === 'MISS') return 'error';
  if (state === 'WAIT') return 'secondary';
  if (state === 'EXTRA') return 'error2';
  return undefined;
}

const Character = styled.span`
  ${color}
`;

const Letter: React.FC<{self: WordState}> = ({self}) => {
  return (
    <Character color={map(self.match)} key={self.id}>
      {self.letter !== '' ? self.letter : self.input}
    </Character>
  );
};

export default Letter;
