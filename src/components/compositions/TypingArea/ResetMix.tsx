import React from 'react';
import styled from 'styled-components';

import {Box} from '../../../components/Box';
import {Selection} from '../../ListBox/ListBox';

const ContextContainer = styled(Box)`
  width: 100%;
  height: 100%;
  background: red;
  grid-area: typing;
  position: relative;
  > button {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const TimeSelectionOptions: {value: string; label: string}[] = [
  {value: '90', label: '90'},
  {value: '60', label: '60'},
  {value: '30', label: '30'},
  {value: '15', label: '15'},
];

export const ContextMix = () => {
  return (
    <ContextContainer
      tabIndex={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {/* <button onClick={brandNew}>reset</button> */}
      {/* <div> */}
      <Selection
        options={[
          {label: 'time', value: 'time'},
          {label: 'words', value: 'words'},
        ]}
        callback={(v) => console.log(v)}
        defaultValue="time"
      />
      <Selection
        options={TimeSelectionOptions}
        callback={(v) => console.log(v)}
        defaultValue="60"
      />
      {/* <button onClick={() => _join('123')}>join</button> */}
      {/* </div> */}
    </ContextContainer>
  );
};
