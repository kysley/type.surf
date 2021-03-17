import React from 'react';

import {Box} from '../../../components/Box';
import {TypingMultiplayer} from '../../TypingArea/typing-area';
import {Progress} from '../GameProgress';

export const StartedScene = ({roomState}: any) => (
  <>
    <Box
      gridArea="content"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {roomState?.state === 'STARTING' && (
        <Box style={{position: 'absolute'}}>
          <h1>{roomState?.countdown}</h1>
        </Box>
      )}
      <TypingMultiplayer obfuscate={roomState?.state === 'STARTING'} />
    </Box>
    <Progress players={roomState?.players} />
  </>
);
