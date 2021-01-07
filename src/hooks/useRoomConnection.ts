import {useCallback, useEffect, useState} from 'react';

import {useSocketConnection} from './useSocketHandler';

export function useRoomConnection(roomId?: string) {
  const {socket} = useSocketConnection();
  const [roomState, setRoomState] = useState(undefined);

  const connect = useCallback(
    (roomId: string) => {
      socket.emit('client.join', {roomId});
    },
    [socket],
  );

  useEffect(() => {
    socket.emit('client.join', {roomId});
  }, [roomId]);

  useEffect(() => {
    socket.on('server.room.broadcast', (roomData: any) => {
      setRoomState(roomData);
    });

    // todo connect this to the current user
    socket.on('server.whois', () => {
      socket.emit(
        'client.whois',
        {userId: 'evanclient', username: 'evanclient'},
        (response: any) => {
          console.log(response);
        },
      );
    });
  }, []);

  return {
    connect,
    roomState,
  };
}
