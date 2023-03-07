import ws from 'ws';

type DataType = 'user' | 'move';
interface UserData {
  id: string;
  username: string;
  room: string;
}

interface UserSocketData extends UserData {
  clientId: string;
}

interface RawData {
  type: DataType;
  user: UserData;
  move: number[];
  opponentId: string;
}

interface ClientData {
  [key: string]: ws.WebSocket;
}

export { ClientData, UserData, UserSocketData, RawData };
