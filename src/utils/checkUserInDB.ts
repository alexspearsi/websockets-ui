import { randomUUID } from 'crypto';
import { IPlayer, IWebSocket } from '../types/types';
import { DB } from '../DB/db';

export function checkUserInDB(ws: IWebSocket, data: Omit<IPlayer, 'index' | 'wins' | 'socket'>) {

  const playerInDB = DB.players.find((player: IPlayer) => player.name === data.name);

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
