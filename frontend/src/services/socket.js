import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket = null;

export function getSocket() {
  if (!socket) {
    const token = localStorage.getItem('ctms_token');
    socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      autoConnect: false,
    });
  }
  return socket;
}

export function connectSocket() {
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
}

export function disconnectSocket() {
  if (socket?.connected) {
    socket.disconnect();
  }
}

export function subscribeToBus(busId, callback) {
  const s = connectSocket();
  s.emit('subscribe:bus', busId);
  s.on('bus:location', callback);
  s.on('bus:status', callback);
  return () => {
    s.emit('unsubscribe:bus', busId);
    s.off('bus:location', callback);
    s.off('bus:status', callback);
  };
}

export function onAnnouncement(callback) {
  const s = connectSocket();
  s.on('announcement:new', callback);
  return () => s.off('announcement:new', callback);
}

export function onJourneyEvent(event, callback) {
  const s = connectSocket();
  s.on(event, callback);
  return () => s.off(event, callback);
}
