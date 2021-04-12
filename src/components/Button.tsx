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
  fontSize: '16px',
  // padding: '.75em 1.5em',
  width: '100%',
  // boxShadow: '$base',
  color: '$text',
  transition: 'background,border .2s ease-in-out',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        '&:hover': {
          backgroundColor: '$primary2',
        },
      },
      secondary: {
        backgroundColor: '$secondary',
      },
      discord: {
        color: '#fff',
        backgroundColor: '#7289da',
        '&:hover': {
          backgroundColor: '#677bc4',
        },
      },
      link: {
        textDecoration: 'underline',
        backgroundColor: 'transparent',
        '&:hover': {
          textDecoration: 'none',
        },
      },
      outline: {
        border: '1px solid $secondary',
        backgroundColor: 'transparent',

        '&:hover': {
          border: '1px solid $text',
        },
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
