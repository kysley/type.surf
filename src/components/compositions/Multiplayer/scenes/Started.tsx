import React from 'react';
import {Box} from '../../../Box';

import TypingAreaComposition from '../../TypingArea';
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
      <TypingAreaComposition obfuscate={roomState?.state === 'STARTING'} />
    </Box>
    <Progress players={roomState?.players} />
  </>
);
