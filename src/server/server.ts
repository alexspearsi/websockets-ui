import 'dotenv/config';
import { WebSocketServer } from 'ws';
import { IWebSocket } from '../types/types';
import { handleRegistration } from '../handlers/handleRegistration';
import { handleCreateRoom } from '../handlers/handleCreateRoom';
import { handleUpdateRoom } from '../handlers/handleUpdateRoom';

const PORT: number = Number(process.env.WS_PORT || 3000);

export const wss = new WebSocketServer({ port: PORT })

export const launchWS = () => {
  wss.on('connection', function connection(ws: IWebSocket) {
    console.log('WebSocket connected');
    
    ws.on('message', (msg) => {
      const info = JSON.parse(msg.toString());
      const data = info.data ? JSON.parse(info.data) : null;
      const type = info.type;
      
      console.log('INFO', info);
      console.log('DATA', data);
      console.log('TYPE', type);
      
      switch (type) {
        case 'reg':
          handleRegistration(ws, data);
          handleUpdateRoom(ws);
          break;

        case 'create_room':
          handleCreateRoom(ws);
          break;
      }
    })

    ws.on('error', console.error);
  })

  wss.on('listening', () => {
    console.log('WebSocket working...');
  })
}