import React from 'react';
import styled from 'styled-components';

import {useTestState} from '../../../hooks/useTestState';
import {Selection} from '../../ListBox/ListBox';

const ResetContainer = styled.div`
  width: 100%;
  grid-area: reset;
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

interface ResetMixProps {
  reset: (...arg0: any) => any;
}

const ResetMix = ({reset}: ResetMixProps) => {
  const {loadNewTest, resetWordState} = useTestState();

  const retry = () => {
    reset();
    resetWordState();
  };

  const brandNew = async () => {
    reset();
    await loadNewTest();
  };

  return (
    <ResetContainer>
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
      {/* </div> */}
    </ResetContainer>
  );
};

export default ResetMix;
