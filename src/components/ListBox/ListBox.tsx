import React, {useState, useCallback} from 'react';
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox';
import styled from 'styled-components';
import css from '@styled-system/css';

import '@reach/listbox/styles.css';
import {CheckCircle} from '@styled-icons/feather';

const StyledListboxPopover = styled(ListboxPopover)(
  css({
    outline: '0 !important',
    border: 'none',
    bg: 'background2',
    mt: '1em',
    borderRadius: '4px',
    boxShadow: 'none !important',
  }),
);

const StyledListboxButton = styled(ListboxButton)(
  css({
    outline: 'none !important',
    border: 'none',
    fontSize: '2rem',
    padding: '0.5rem 1rem',
    bg: 'background2',
    cursor: 'pointer',
    color: 'text',
    boxShadow: 'default',
    borderRadius: '4px',
    transition: 'all .1s ease-in-out',
    ':hover': {
      boxShadow: 'active',
    },
    '&[aria-expanded="true"]': {
      boxShadow: 'active',
      bg: 'background3',
    },
  }),
);

const StyledListboxList = styled(ListboxList)(
  css({
    p: '0.5rem 0.75rem',
  }),
);

const StyledListboxOption = styled(ListboxOption)(
  css({
    color: 'text',
    p: '0.5em 2.5em 0.5em 0.5em',
    cursor: 'pointer',
    borderRadius: '4px',
    '&[aria-selected="true"]': {
      bg: 'background3',
    },
  }),
);

type Option = {
  value: string;
  key?: string;
  label: string;
  payload?: any;
};

type SelectionProps = {
  callback: (value: Option['value']) => void;
  defaultValue?: string;
  options: Option[];
  passPayload?: boolean;
};

export function Selection({
  callback,
  defaultValue = '',
  options,
  passPayload = false,
}: SelectionProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(
    (v) => {
      setValue(v);
      if (passPayload) {
        const match = options.find((option) => option.value === v);
        callback(match?.payload || v);
        return;
      }
      callback(v);
    },
    [callback, options, passPayload],
  );

  return (
    <ListboxInput
      onChange={handleChange}
      value={value}
      // defaultValue={defaultValue}
    >
      <StyledListboxButton
      // arrow={<ArrowDown height="30px" strokeWidth={2} />}
      />
      <StyledListboxPopover>
        <StyledListboxList>
          {options.map((opt, idx) => (
            <StyledListboxOption value={opt.value} key={opt.key || opt.value}>
              {opt.label || opt.value}
              {value === opt.value && (
                <CheckCircle
                  height="15px"
                  strokeWidth="3px"
                  style={{paddingLeft: '0.5em'}}
                />
              )}
            </StyledListboxOption>
          ))}
        </StyledListboxList>
      </StyledListboxPopover>
    </ListboxInput>
  );
}
