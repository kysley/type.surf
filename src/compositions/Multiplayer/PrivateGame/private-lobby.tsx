import React from 'react';
import {useParams} from 'react-router';

import {useRoomConnection} from '../../../hooks/useRoomConnection';
import {useStateSync} from '../../../hooks/useStateSync';
import {styled} from '../../../styled';
import {LobbyScene} from '../scenes/Lobby';
import {StartedScene} from '../scenes/Started';

export const PrivateLobby = () => {
  const {id} = useParams();
  useRoomConnection(id);
  const {roomState} = useStateSync();

  return (
    <Container>
      {/* <> */}
      {roomState?.state === 'LOBBY' && <LobbyScene roomState={roomState} />}
      {(roomState?.state === 'STARTED' ||
        roomState?.state === 'STARTING' ||
        roomState?.state === 'WAITING') && (
        <StartedScene roomState={roomState} />
      )}
      {/* </> */}
    </Container>
  );
};

const Container = styled('div', {});
