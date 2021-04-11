import React from 'react';

import {styled} from '../styled';

export const Input = styled('input', {
  background: '$background2',
  height: '40px',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid $background3',
  // borderColor: '$background3',
  transition: 'border-color .2s ease-in-out',
  outline: 'none',
  color: '$text',

  '&:hover': {
    borderColor: '$secondary',
  },

  '&:focus': {
    borderColor: '$primary',
  },
});

type LabelledInputProps = {
  type?: string;
  label: string;
};
export const LabelledInput: React.FC<LabelledInputProps> = React.forwardRef(
  ({type = undefined, label, ...rest}) => {
    return (
      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '.78rem',
          textTransform: 'uppercase',
        }}
      >
        {label}
        <Input type={type} {...rest} />
      </label>
    );
  },
);
