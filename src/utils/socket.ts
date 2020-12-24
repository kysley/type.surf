import {io} from 'socket.io-client';

const socketUrl = 'http://localhost:8086';

export const socket = io(socketUrl, {
  transports: ['websocket'],
});
