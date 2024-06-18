import socketIOClient from "socket.io-client";


export const chatSocket = socketIOClient('http://127.0.0.1:5000', {
  transports: ['websocket'],
  upgrade: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000,
  withCredentials: true,
});

chatSocket.on('connect', () => {
  console.log('Connected to the server');
});

chatSocket.on('disconnect', (reason) => {
  console.log('Disconnected from the server', reason);
  if (reason === 'io server disconnect') {
    chatSocket.connect();
    window.location.href = '/login';
  }
});



