import styled from 'styled-components';

import {Box} from './Box';

export const Stack = styled(Box)<{direction: 'row' | 'column'}>(
  ({direction = 'column'}) => ({
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
    display: 'flex',
    flexDirection: direction,
    position: 'relative',

    '> *': {
      marginTop: direction === 'column' ? '1rem' : undefined,
      marginRight: direction === 'row' ? '1rem' : undefined,
    },

    ':first-child': {
      marginTop: undefined,
    },
  }),
);
