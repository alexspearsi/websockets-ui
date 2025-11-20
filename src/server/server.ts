import 'dotenv/config';
import { WebSocketServer, WebSocket } from 'ws';
import { randomUUID } from 'crypto';

const PORT: number = Number(process.env.WS_PORT || 3000);

const wss = new WebSocketServer({ port: PORT })

interface IWebSocket extends WebSocket {
  id: string;
  playerName: string;
}

interface IPlayer {
  index: string,
  name: string,
  password: string,
  wins: number,
  socket: IWebSocket
}

interface IDataBase {
  players: IPlayer[],
  rooms: unknown[],
  games: unknown[]
}

const DB: IDataBase = {
  players: [],
  rooms: [],
  games: [],
}

export const launchWS = () => {
  wss.on('connection', function connection(ws: IWebSocket) {
    console.log('WebSocket connected');
    
    ws.on('message', (msg) => {
      const info = JSON.parse(msg.toString());
      const data = JSON.parse(info.data);
      const type = info.type;
      
      console.log('INFO', info);
      console.log('DATA', data);
      console.log('TYPE', type);
      
      switch (type) {
        case 'reg':

        const result = checkExistedUserInDB(ws, data);
        const JSONData = JSON.stringify({
          name: data.name,
          index: result.index,
          error: result.error,
          errorText: result.errorText
        });

        const response = {
          type: 'reg',
          data: JSONData,
          id: 0
        }

        ws.send(JSON.stringify(response))
          

        break;
      }
    })

    ws.on('error', console.error);
  })

  wss.on('listening', () => {
    console.log('WebSocket working...');
  })
}


function checkExistedUserInDB(ws: IWebSocket, data: Omit<IPlayer, 'index'>) {

  const playerInDB = DB.players.find(player => player.name === data.name);

  if (playerInDB) {
    if (playerInDB.password === data.password) {
      ws.playerName = data.name;

      return {
        index: playerInDB.index,
        error: false
      }
    } else {
      return {
        error: true,
        errorText: 'Wrong credentials'
      }
    }
  } else {
    ws.playerName = data.name;
    const newPlayer = {
      index: randomUUID(),
      ...data,
      wins: 0,
      socket: ws
    }

    DB.players.push(newPlayer)

    return {
      index: newPlayer.index,
      error: false,
    }
  }
}