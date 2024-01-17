import {WebSocketServer} from "ws"
import { applyWSSHandler } from "@trpc/server/adapters/ws"
import {appRouter} from "src/server/api/root"
import { createTRPCContext } from "src/server/api/trpc"

const wss = new WebSocketServer({
    port: 3001
})

const handler = applyWSSHandler({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    wss, router: appRouter, createContext: createTRPCContext as any
})


//Todo: remove redundant client connections and close sockets if client doesn't ping back
wss.on("connection", (ws) => {
    const fakeClientId = Math.floor(Math.random() * 1000)
  console.log(`Connection (${wss.clients.size})`);
    console.info(`➕➕ client_connected ${fakeClientId} - Connection (${wss.clients.size})`)
    ws.once("close", () => {
        console.info(`cliend_close ${fakeClientId} ➖➖ Connection (${wss.clients.size})`);
    })
})


console.info("wss enabled")

process.on('SIGTERM', () => {
    console.log('SIGTERM');
    handler.broadcastReconnectNotification();
    wss.close();
  });