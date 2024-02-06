import { createContext } from './context';
import { appRouter } from './routers/_app';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({
  port: 3001,
});
const handler = applyWSSHandler({ wss, router: appRouter, createContext });

const fakeClientId = Math.floor(Math.random() * 1000);

wss.on('connection', (ws) => {
  console.log(
    `➕➕ Connection ${fakeClientId} -total ws connections: (${wss.clients.size})`,
  );
  ws.once('close', () => {
    console.log(
      `➖➖ Connection ${fakeClientId} - total ws connections: (${wss.clients.size})`,
    );
  });
});
console.log('✅ WebSocket Server listening on ws://localhost:3001');

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wss.close();
});
