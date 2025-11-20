import 'dotenv/config';
import { WebSocketServer } from 'ws';

const PORT: number = Number(process.env.WS_PORT || 3000);

const wss = new WebSocketServer({ port: PORT })

export const launchWS = () => {
  wss.on('connection', function connection(ws) {
    console.log('WebSocket connected');
    ws.on('message', (msg) => {
      console.log(msg);
    })

    ws.on('error', console.error);
  })

  wss.on('listening', () => {
    console.log('WebSocket working...');
  })
}
