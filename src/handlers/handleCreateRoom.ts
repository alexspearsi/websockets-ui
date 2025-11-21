import { randomUUID } from 'crypto';
import { IWebSocket } from '../types/types';
import { DB } from '../DB/db';
import { wss } from '../server/server';

export function handleCreateRoom(ws: IWebSocket) {
  const user = DB.players.find(player => player.socket.id === ws.id);

  if (user) {
    const room = {
      roomId: randomUUID(),
      roomUsers: [
        {
          name: user.name,
          index: user.index
        }
      ]
    }

    DB.rooms.push(room)
    wss.clients.forEach(client => {
      const rooms = DB.rooms.filter(room => room.roomUsers.length === 1 && ws.playerName !== room.roomUsers[0].name)

      const response = {
        type: 'update_room',
        data: JSON.stringify(rooms),
        id: 0
      };

      ws.send(JSON.stringify(response))
    })
  }
}