import React from 'react';
import {useRecoilCallback} from 'recoil';
import styled from 'styled-components';
import {Repeat} from '@styled-icons/feather';

import {letterIndex, wordIndex, wordState} from '../../../state';
import {wordList} from '../../../state';
import {Box} from '../../../components/Box';
import {Selection} from '../../ListBox/ListBox';
import {Button} from '../../../components/Button';

const ContextContainer = styled(Box)`
  width: 100%;
  height: 100%;
  /* background: red; */
  grid-area: context;
  position: relative;
`;

const TimeSelectionOptions: {value: string; label: string}[] = [
  {value: '90', label: '90'},
  {value: '60', label: '60'},
  {value: '30', label: '30'},
  {value: '15', label: '15'},
];

export const ContextMix = () => {
  const tester = useRecoilCallback(({snapshot, reset}) => async () => {
    const wordlist = await snapshot.getPromise(wordList);
    for (let i = wordlist.length; i--; i >= 0) {
      reset(wordState(i));
    }

    reset(wordIndex);
    reset(letterIndex);
  });
  return (
    <ContextContainer
      tabIndex={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="secondary"
      p={2}
    >
      <Button variant="primary" onClick={tester}>
        <Repeat size={24} title="Restart Test" />
      </Button>
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
    </ContextContainer>
  );
};
