import React from 'react';
import styled from 'styled-components';
import {space, variant, border, SpaceProps, BorderProps} from 'styled-system';

const Button2 = styled('button')(
  {
    appearance: 'none',
    borderRadius: 4,
    outline: 0,
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '.75em 1.5em',
  },
  variant({
    variants: {
      primary: {
        color: 'background',
        bg: 'primary',
        ':hover': {
          bg: 'primary2',
        },
      },
      secondary: {
        color: 'background',
        bg: 'secondary',
      },
    },
  }),
  space,
  border,
);

type ButtonProps = {
  variant: 'primary' | 'secondary';
  onClick: () => any;
} & SpaceProps &
  BorderProps;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  onClick = () => {},
  ...rest
}) => {
  return (
    <Button2 variant={variant} onClick={onClick} {...rest}>
      {children}
    </Button2>
  );
};
