import ws from 'ws';
import { v4 } from 'uuid';

import { ClientData, UserData } from './interfaces';

const clients: ClientData = {};
const users: UserData[] = [];

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
    for (const id in clients) {
      clients[id].send(JSON.stringify(users));
    }
    users.push(user);
  });

  ws.on('close', () => {
    delete clients[id];
  });
});
