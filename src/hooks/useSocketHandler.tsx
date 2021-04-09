import React, {createContext, useCallback, useContext, useRef} from 'react';
import {useNavigate} from 'react-router';

import {socket} from '../utils/socket';

const SocketContext = createContext(socket);

export const SocketProvider: React.FC = ({children}) => {
  const socketRef = useRef<typeof socket>(socket);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export function useSocketConnection() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const s = socket;
  //   if (socket.disconnected) {
  //     socket.connect();
  //   }
  //   return () => {
  //     s.disconnect();
  //   };
  // }, [socket]);

  // useEffect(() => {
  //   if (!signal && signal !== undefined) socket.disconnect();
  //   else socket.connect();
  // }, [signal, socket]);

  const queue = useCallback(() => {
    socket.emit('client.queue', 'RACE', (roomId: string) => {
      navigate(`/play/${roomId}`);
    });
  }, []);

  return {socket, queue};
}
