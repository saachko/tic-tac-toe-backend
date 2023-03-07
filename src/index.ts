import ws from 'ws';
import { v4 } from 'uuid';

import { ClientData, RawData, UserData, UserSocketData } from './interfaces';

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
    const rawData: RawData = JSON.parse(data.toString());

    switch (rawData.type) {
      case 'user':
        const user = rawData.user;
        users.push({ ...user, clientId: id });
        for (const id in clients) {
          clients[id].send(JSON.stringify({ type: 'user', users }));
        }
        break;
      case 'move':
        for (const id in clients) {
          clients[id].send(
            JSON.stringify({
              type: 'move',
              moves: rawData.move,
              opponentId: rawData.opponentId,
            })
          );
        }
        break;
    }
  });

  ws.on('close', () => {
    users = users.filter((user) => user.clientId !== id);
    delete clients[id];
  });
});
