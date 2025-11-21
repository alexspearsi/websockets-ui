import { DB } from '../DB/db';
import { IWebSocket } from '../types/types';

export function handleUpdateRoom(ws: IWebSocket) {
  const rooms = DB.rooms.filter(room => room.roomUsers.length === 1 && ws.playerName !== room.roomUsers[0].name)
  const response = {
    type: 'update_room',
    data: JSON.stringify(rooms),
    id: 0
  };
  ws.send(JSON.stringify(response))
}