import ws from 'ws';
interface UserData {
  id: string;
  username: string;
  room: string;
}

interface UserSocketData extends UserData {
  clientId: string;
}

interface ClientData {
  [key: string]: ws.WebSocket;
}

export { ClientData, UserData, UserSocketData };
