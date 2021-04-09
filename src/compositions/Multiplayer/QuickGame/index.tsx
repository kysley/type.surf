import React from 'react';
import {useParams} from 'react-router';

import {Box} from '../../../components/Box';
import {useRoomConnection} from '../../../hooks/useRoomConnection';
import {useStateSync} from '../../../hooks/useStateSync';
import {TypingMultiplayer} from '../../TypingArea/typing-area';
import {Progress} from '../GameProgress';

export const QuickGame = () => {
  const {id} = useParams();
  useRoomConnection(id);
  const {roomState} = useStateSync();

  if (!roomState) {
    return <h1>no room yet show placeholder!</h1>;
  }
  // return (
  //   <Container>
  //     <>
  //       {roomState?.state === 'LOBBY' && <LobbyScene roomState={roomState} />}
  //       {(roomState?.state === 'STARTED' ||
  //         roomState?.state === 'STARTING') && (
  //         <StartedScene roomState={roomState} />
  //       )}
  //     </>
  //   </Container>
  // );
  return (
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
};
