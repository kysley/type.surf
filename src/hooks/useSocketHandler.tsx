import React, {createContext, useContext, useRef} from 'react';

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

  return {socket};
}
