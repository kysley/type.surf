import {styled} from '../styled';

export const Stack = styled('div', {
  boxSizing: 'border-box',
  margin: 0,
  minWidth: 0,
  display: 'flex',
  // flexDirection: direction,
  position: 'relative',

  ':first-child': {
    marginTop: 0,
  },

  variants: {
    direction: {
      col: {
        flexDirection: 'column',
        '> *': {
          marginTop: '1rem',
        },
      },
      row: {
        flexDirection: 'row',
        '> *': {
          marginRight: '1rem',
        },
      },
    },
  },
  defaultVariants: {
    direction: 'col',
  },
});
