import ws from 'ws';

const { Server } = ws;
const wss = new Server(
  {
    port: 3001,
  },
  () => console.log(`server started`)
);
