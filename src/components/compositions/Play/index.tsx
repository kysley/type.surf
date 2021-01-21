import React from 'react';

import {Box} from '../../Box';
import TypingAreaComposition from '../TypingArea';
import {Selection} from '../../ListBox/ListBox';
import {ChevronsRight} from '@styled-icons/feather';
import {Stack} from '../../Stack';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {ModeState, OrbitState} from '../../../state/state';

export const Play = () => {
  const [orbitState, setOrbitState] = useRecoilState(OrbitState);
  const [modeState, setModeState] = useRecoilState(ModeState);
  return (
    <Box
      style={{position: 'relative'}}
      width="55%"
      height="auto"
      justifyContent="center"
      justifySelf="center"
      display="flex"
      flexDirection="column"
    >
      <Stack
        direction="row"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        pb="2em"
      >
        <Selection
          callback={(v) => setModeState(v)}
          options={[
            {label: 'Time', value: 'time'},
            {label: 'Words', value: 'words'},
          ]}
          defaultValue={modeState}
        />
        <ChevronsRight height="24px" strokeWidth="2px" />
        <Selection
          callback={(v) => setOrbitState(Number(v))}
          options={[
            {label: '30', value: '30'},
            {label: '60', value: '60'},
          ]}
          defaultValue={orbitState.toString()}
        />
      </Stack>
      <TypingAreaComposition />
    </Box>
  );
};

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
