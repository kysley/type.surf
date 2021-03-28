import React, {useEffect} from 'react';
import {useRecoilValue} from 'recoil';

import {Box} from '../../components/Box';
import {ModeState, OrbitState} from '../../state';
import {TypingPractice} from '../TypingArea/typing-area';
import {useWordset} from '../../hooks/useWordset';
import {useLocalGame} from '../../hooks/useLocalGame';

export function Play() {
  const {getWordset} = useWordset();
  const orbitState = useRecoilValue(OrbitState);
  const modeState = useRecoilValue(ModeState);

  useLocalGame();

  useEffect(() => {
    getWordset();
  }, [modeState, orbitState, getWordset]);

  return (
    <Box
      style={{position: 'relative'}}
      width="72.3%"
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
