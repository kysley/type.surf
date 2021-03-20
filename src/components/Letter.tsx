import React, {memo} from 'react';

import {styled} from '../styled';

const StyledLetter = styled('span', {
  variants: {
    state: {
      HIT: {
        color: '$text',
      },
      MISS: {
        color: '$error',
      },
      WAIT: {
        color: '$secondary',
      },
      EXTRA: {
        color: '$error2',
      },
    },
  },
});

const Letter: React.FC<{self: WordState}> = ({self}) => {
  return (
    <StyledLetter state={self.match} key={self.id}>
      {self.letter !== '' ? self.letter : self.input}
    </StyledLetter>
  );
};

export default memo(Letter, (prev, next) => prev.self === next.self);
