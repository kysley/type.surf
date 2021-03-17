import React from 'react';
// import styled from 'styled-components';
// import {space, variant, border, SpaceProps, BorderProps} from 'styled-system';

import {styled} from '../styled';

// const Button2 = styled('button')(
//   {
//     appearance: 'none',
//     borderRadius: 4,
//     outline: 0,
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '1rem',
//     padding: '.75em 1.5em',
//     width: '100%',
//   },
//   variant({
//     variants: {
//       primary: {
//         color: 'background',
//         bg: 'primary',
//         ':hover': {
//           bg: 'primary2',
//         },
//       },
//       secondary: {
//         color: 'background',
//         bg: 'secondary',
//       },
//     },
//   }),
//   space,
//   border,
// );

const Button2 = styled('button', {
  appearance: 'none',
  borderRadius: 4,
  outline: 0,
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '.75em 1.5em',
  width: '100%',

  variants: {
    type: {
      primary: {
        color: '$background',
        background: '$primary',
        ':hover': {
          background: '$primary2',
        },
      },
      secondary: {
        color: '$background',
        background: '$secondary',
      },
    },
  },
});

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  onClick?: () => any;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  onClick = () => {},
  ...rest
}) => {
  return (
    //@ts-ignore the stupid variant types freak out on Button2
    <Button2 type={variant} onClick={onClick} {...rest}>
      {children}
    </Button2>
  );
};
