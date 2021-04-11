import React, {useState, useCallback} from 'react';
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox';
import {Checkmark} from '@styled-icons/ionicons-outline';

import {styled} from '../../styled';

const StyledListboxPopover = styled(ListboxPopover, {
  outline: '0 !important',
  border: 'none',
  background: '$background2',
  borderColor: '$background3',
  borderWidth: '2px',
  borderStyle: 'solid',
  marginTop: '1em',
  borderRadius: '4px',
  boxShadow: 'none !important',
});

const StyledListboxButton = styled(ListboxButton, {
  outline: 'none !important',
  border: 'none',
  height: '40px',
  padding: '0 1.35rem',
  background: '$background2',
  cursor: 'pointer',
  color: '$text',
  fontWeight: 500,
  // boxShadow: 'default',
  borderRadius: '4px',
  fontSize: '1rem',
  // transition: 'all .1s ease-in-out',
  ':hover': {
    // boxShadow: 'active',
    background: '$background3',
  },
  ':focus': {
    // boxShadow: 'active',
    background: '$background3',
  },
});

const StyledListboxList = styled(ListboxList, {
  padding: '0.25rem 0.5rem',
});

const StyledListboxOption = styled(ListboxOption, {
  color: '$text',
  padding: '0.5em 2.5em 0.5em 0.5em',
  cursor: 'pointer',
  borderRadius: '6px',
  '&[aria-selected="true"]': {
    background: '$background3',
  },
});

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
  prefix?: any;
};

export function Selection({
  callback,
  defaultValue = '',
  options,
  passPayload = false,
  prefix: Prefix = null,
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
      >
        {Prefix ? (
          <>
            <Prefix size="24px" strokeWidth="2px" />
            {value}
          </>
        ) : null}
      </StyledListboxButton>
      <StyledListboxPopover>
        <StyledListboxList>
          {options.map((opt, idx) => (
            <StyledListboxOption value={opt.value} key={opt.key || opt.value}>
              {opt.label || opt.value}
              {value === opt.value && (
                <Checkmark
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
