import React from 'react';
import {ChevronsRight, Minus, RefreshCw} from '@styled-icons/feather';
import css from '@styled-system/css';
import {useTransition} from 'react-spring';
import {animated} from 'react-spring';
import {useRecoilState, useRecoilValue} from 'recoil';
import styled from 'styled-components';
import {useTypingControls} from '../../hooks/useTypingControls';

import {HasStartedState, ModeState, OrbitState} from '../../state';
import {Box} from '../../components/Box';
import {Selection} from '../../components/ListBox/ListBox';
import {Progressbar} from '../../components/Progress';
import {Stack} from '../../components/Stack';

const StyledContextButton = styled(Box)(
  css({
    outline: 'none !important',
    border: 'none',
    height: '40px',
    padding: '0.5rem 1rem',
    bg: 'background2',
    cursor: 'pointer',
    color: 'text',
    borderRadius: '4px',
    ':hover': {
      bg: 'background3',
    },
    ':active': {
      bg: 'background3',
    },
  }),
);

const ContextButton: React.FC<any> = ({children, ...rest}) => {
  return (
    <StyledContextButton {...rest} as="button">
      {children}
    </StyledContextButton>
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
              <Stack direction="row"></Stack>
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
      <ContextButton tabIndex="0" bg="error2" onClick={repeat} gridColumn={9}>
        <RefreshCw size="20px" strokeWidth="2px" />
      </ContextButton>
      <ContextButton tabIndex="0" bg="text" onClick={reset} gridColumn={10}>
        <ChevronsRight size="24px" strokeWidth="2px" />
      </ContextButton>
    </Box>
  );
}
