import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useTimer} from 'use-timer';

import {Box} from '../../components/Box';
import {
  testTypingState,
  EOWState,
  HasStartedState,
  ModeState,
  OrbitState,
  TimeEslapsedState,
} from '../../state';
import {TypingPractice} from '../TypingArea/typing-area';
import {useWordset} from '../../hooks/useWordset';

export function Play() {
  const {getWordset} = useWordset();
  const [orbitState, setOrbitState] = useRecoilState(OrbitState);
  const [modeState, setModeState] = useRecoilState(ModeState);
  const setTypingState = useSetRecoilState(testTypingState);
  const hasStartedState = useRecoilValue(HasStartedState);
  const eowState = useRecoilValue(EOWState);
  const setTimeEslapsedState = useSetRecoilState(TimeEslapsedState);

  const {reset: resetTimer, start: startTimer} = useTimer({
    autostart: false,
    initialTime: orbitState,
    timerType: 'DECREMENTAL',
    onTimeOver: () => setTypingState('DONE'),
    onTimeUpdate: (time) => setTimeEslapsedState(orbitState - time),
    endTime: 0,
  });

  useEffect(() => {
    getWordset();
  }, [modeState, orbitState, getWordset]);

  useEffect(() => {
    if (hasStartedState && modeState === 'time') {
      startTimer();
      setTypingState('STARTED');
    } else if (!hasStartedState && modeState === 'time') {
      resetTimer();
    }
  }, [hasStartedState, modeState, setTypingState]);

  useEffect(() => {
    if (eowState) {
      setTypingState('DONE');
    } else {
      setTypingState('WAITING');
    }
  }, [eowState, setTypingState]);

  return (
    <Box
      style={{position: 'relative'}}
      width="80%"
      height="auto"
      justifyContent="center"
      justifySelf="center"
      display="flex"
      flexDirection="column"
    >
      <TypingPractice />
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
