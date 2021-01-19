import {useEffect} from 'react';

import {useSocketConnection} from './useSocketHandler';

export function useRoomConnection(roomId: string) {
  const {socket} = useSocketConnection();

  useEffect(() => {
    if (roomId) {
      console.log('join');
      socket.emit('client.join', roomId);
    }
    return () => {
      socket.emit('client.leave', roomId);
    };
  }, [roomId]);

  useEffect(() => {
    socket.on('server.retry', () =>
      setTimeout(() => {
        socket.emit('client.join', roomId);
      }, 1000),
    );
    return () => {
      socket.off('client.join');
    };
  }, [roomId]);
}
