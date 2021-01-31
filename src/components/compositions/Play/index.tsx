import React, {useEffect} from 'react';
import {animated, useTransition} from 'react-spring';
import {ChevronLeft, ChevronsRight, Minus} from '@styled-icons/feather';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {useMutation} from 'urql';
import {useTimer} from 'use-timer';
import css from '@styled-system/css';
import styled from 'styled-components';

import {Box} from '../../Box';
import TypingAreaComposition from '../TypingArea';
import {Selection} from '../../ListBox/ListBox';
import {Stack} from '../../Stack';
import type {
  WordsetMutation,
  WordsetMutationVariables,
} from '../../../graphql/gen/operations';
import {WORDSET} from '../../../graphql/mutations';
import {
  letterIndex,
  testHistory,
  testTypingState,
  wordIndex,
  wordList,
  wordState,
  EOLState,
  EOWState,
  HasStartedState,
  ModeState,
  OrbitState,
  statsForNerds,
  TimeEslapsedState,
} from '../../../state';
import {Progressbar} from '../../Progress';

const StyledContextButton = styled(Box)(
  css({
    outline: 'none !important',
    border: 'none',
    height: '40px',
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
  }),
);

const ContextButton: React.FC<any> = ({children, ...rest}) => {
  return (
    <StyledContextButton {...rest} as="button">
      {children}
    </StyledContextButton>
  );
};

// this should be contextmix
export function Play() {
  const [, mut] = useMutation<WordsetMutation, WordsetMutationVariables>(
    WORDSET,
  );
  const [orbitState, setOrbitState] = useRecoilState(OrbitState);
  const [modeState, setModeState] = useRecoilState(ModeState);
  const setTypingState = useSetRecoilState(testTypingState);
  const hasStartedState = useRecoilValue(HasStartedState);
  const eowState = useRecoilValue(EOWState);
  const setTimeEslapsedState = useSetRecoilState(TimeEslapsedState);
  const {wpm} = useRecoilValue(statsForNerds);
  console.log(wpm);

  const transitions = useTransition(hasStartedState, null, {
    from: {position: 'absolute', opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
  });

  const {reset: resetTimer, start: startTimer} = useTimer({
    autostart: false,
    initialTime: Number(orbitState),
    timerType: 'DECREMENTAL',
    onTimeOver: () => setTypingState('DONE'),
    onTimeUpdate: (time) => setTimeEslapsedState(time),
    endTime: 0,
  });

  useEffect(() => {
    getWordset();
  }, [modeState, orbitState]);

  useEffect(() => {
    if (hasStartedState && modeState === 'time') {
      startTimer();
      setTypingState('STARTED');
    } else if (!hasStartedState && modeState === 'time') {
      resetTimer();
    }
  }, [hasStartedState, modeState, setTypingState]);

  useEffect(() => {
    if (EOWState) {
      setTypingState('DONE');
    } else {
      setTypingState('WAITING');
    }
  }, [eowState, setTypingState]);

  const repeat = useRecoilCallback(({snapshot, reset}) => async () => {
    const wordlist = await snapshot.getPromise(wordList);
    for (let i = wordlist.length; i--; i >= 0) {
      reset(wordState(i));
    }

    reset(wordIndex);
    reset(letterIndex);
    reset(HasStartedState);
    reset(EOLState);
    reset(EOWState);
    reset(testHistory);
    reset(testTypingState);
  });

  const reset = useRecoilCallback(({snapshot, reset, set}) => async () => {
    await repeat();
    const orbit = await snapshot.getPromise(OrbitState);
    const res = await mut({length: Number(orbit)});
    set(wordList, res.data?.wordset?.wordset?.split('|'));
  });

  const getWordset = useRecoilCallback(
    ({snapshot, reset, set}) => async () => {
      const orbit = await snapshot.getPromise(OrbitState);
      const mode = await snapshot.getPromise(ModeState);
      let res;
      console.log(mode);
      if (mode === 'words') {
        res = await mut({length: Number(orbit)});
      } else {
        res = await mut({length: 300});
      }
      set(wordList, res.data?.wordset?.wordset?.split('|'));
    },
    [mut],
  );

  return (
    <Box
      style={{position: 'relative'}}
      width="65%"
      height="auto"
      justifyContent="center"
      justifySelf="center"
      display="flex"
      flexDirection="column"
    >
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
                  />
                  <Minus height="24px" strokeWidth="2px" />
                  <Selection
                    callback={(v) => setOrbitState(Number(v))}
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
        <ContextButton tabIndex={2} bg="error2" onClick={repeat} gridColumn={9}>
          <ChevronLeft size="24px" strokeWidth="2px" />
        </ContextButton>
        <ContextButton tabIndex={1} bg="text" onClick={reset} gridColumn={10}>
          <ChevronsRight size="24px" strokeWidth="2px" />
        </ContextButton>
      </Box>
      <TypingAreaComposition />
    </Box>
  );
}

// export const Play = () => {
//   const {socket} = useSocketConnection();
//   const navigate = useNavigate();
//   return (
//     <Box
//       display="grid"
//       gridTemplateColumns="1fr 1fr"
//       gridGap="3em"
//       gridArea="main"
//       onClick={() =>
//         socket.emit('client.queue', 'RACE', (roomId: string) => {
//           navigate(`/p/${roomId}`);
//         })
//       }
//     >
//       <Box bg="primary">
//         <h2>Race</h2>
//       </Box>
//       <Box>
//         <h2>Circuit (soon)</h2>
//       </Box>
//     </Box>
//   );
// };
