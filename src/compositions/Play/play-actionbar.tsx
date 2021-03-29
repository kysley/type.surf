import React from 'react';
import {ChevronsRight, Minus, RefreshCw} from '@styled-icons/feather';
import {useTransition} from 'react-spring';
import {animated} from 'react-spring';
import {useRecoilState, useRecoilValue} from 'recoil';

import {useTypingControls} from '../../hooks/useTypingControls';
import {
  HasStartedState,
  ModeState,
  OrbitState,
  statsForNerds,
} from '../../state';
import {Box} from '../../components/Box';
import {Selection} from '../../components/ListBox/ListBox';
import {Progressbar} from '../../components/Progress';
import {Stack} from '../../components/Stack';
import {Button} from '../../components/Button';

const PlayerStats = () => {
  const stats = useRecoilValue(statsForNerds);

  console.log(stats);

  return (
    <Box flex="fill">
      <span>wpm: {stats.wpm}</span>
      <span>acc: {stats.acc}</span>
    </Box>
  );
};

export function ActionBar() {
  const {reset, repeat} = useTypingControls();
  const [orbitState, setOrbitState] = useRecoilState(OrbitState);
  const [modeState, setModeState] = useRecoilState(ModeState);
  const hasStartedState = useRecoilValue(HasStartedState);
  const transitions = useTransition(hasStartedState, null, {
    from: {position: 'absolute', opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
  });
  return (
    <Box
      display="grid"
      height="56px"
      gridAutoFlow="column"
      gridTemplateColumns="repeat(10, 1fr)"
      justifyContent="center"
      gridGap="1em"
      alignItems="center"
    >
      <Box gridColumn={'1/3'} alignItems="center" display="flex">
        <Progressbar />
      </Box>
      <Box gridColumn={'4/7'} alignItems="center" display="flex">
        {transitions.map(({item, key, props}) =>
          item ? (
            <animated.div key={key} style={{...props, width: '100%'}}>
              <Stack direction="row">
                <PlayerStats />
              </Stack>
            </animated.div>
          ) : (
            <animated.div key={key} style={{...props, width: '100%'}}>
              <Stack
                direction="row"
                justifyContent="center"
                alignSelf="center"
                alignItems="center"
              >
                <Selection
                  callback={(v) => setModeState(v)}
                  options={[
                    {label: 'Time', value: 'time'},
                    {label: 'Words', value: 'words'},
                  ]}
                  defaultValue={modeState}
                  // prefix={Clock}
                />
                <Minus height="24px" strokeWidth="2px" />
                <Selection
                  callback={(v) => setOrbitState(+v)}
                  options={[
                    {label: '30', value: '30'},
                    {label: '60', value: '60'},
                  ]}
                  defaultValue={orbitState.toString()}
                />
              </Stack>
            </animated.div>
          ),
        )}
      </Box>
      <Button onClick={repeat} css={{gridColumn: 9}} type="secondary">
        <RefreshCw size="24px" strokeWidth="2px" />
      </Button>
      <Button onClick={reset} css={{gridColumn: 10}}>
        <ChevronsRight size="24px" strokeWidth="2px" />
      </Button>
    </Box>
  );
}
