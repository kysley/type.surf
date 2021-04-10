import {styled} from '../styled';

export const Button = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  appearance: 'none',
  borderRadius: 4,
  outline: 0,
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  // padding: '.75em 1.5em',
  width: '100%',
  boxShadow: '$base',
  color: '$text',

  variants: {
    variant: {
      primary: {
        color: '$background',
        background: '$primary',
        '&:hover': {
          background: '$primary2',
        },
      },
      secondary: {
        color: '$background',
        background: '$secondary',
      },
    },
    size: {
      small: {
        height: '20px',
      },
      medium: {
        height: '40px',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    variant: 'primary',
  },
});
