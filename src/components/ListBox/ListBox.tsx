import React, {useState, useMemo, useCallback} from 'react';
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
  Listbox,
} from '@reach/listbox';
import styled from 'styled-components';

import '@reach/listbox/styles.css';

const List = styled(Listbox)`
  background: black;
  border-radius: 3px;
`;

type Option<T> = {
  value: string;
  key?: string;
  label: string;
  payload?: T;
};

type SelectionProps<T> = {
  callback: (value: T | string) => void;
  defaultValue?: string;
  options: Option<T>[];
  passPayload?: boolean;
};

export function Selection<T>({
  callback,
  defaultValue = '',
  options,
  passPayload = false,
}: SelectionProps<T>) {
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
    <div>
      <ListboxInput
        onChange={handleChange}
        value={value}
        // defaultValue={defaultValue}
      >
        <ListboxButton arrow="v" />
        <ListboxPopover>
          <ListboxList>
            {options.map((opt, idx) => (
              <ListboxOption value={opt.value} key={opt.key || opt.value}>
                {opt.label || opt.value}
              </ListboxOption>
            ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  );
}
