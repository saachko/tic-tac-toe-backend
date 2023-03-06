import ws from 'ws';
import { v4 } from 'uuid';

import { ClientData, UserData, UserSocketData } from './interfaces';

const clients: ClientData = {};
let users: UserSocketData[] = [];

const { Server } = ws;
const wss = new Server(
  {
    port: 3001,
  },
  () => console.log(`server started`)
);

wss.on('connection', (ws) => {
  const id = v4();
  clients[id] = ws;

  ws.on('message', (data) => {
    const user: UserData = JSON.parse(data.toString());
    users.push({ ...user, clientId: id });
    for (const id in clients) {
      clients[id].send(JSON.stringify(users));
    }
  });

  ws.on('close', () => {
    users = users.filter((user) => user.clientId !== id);
    delete clients[id];
  });
});
