import ws from 'ws';
interface UserData {
  id: string;
  username: string;
  room: string;
}

interface ClientData {
  [key: string]: ws.WebSocket;
}

export { ClientData, UserData };
