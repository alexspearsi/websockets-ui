import { IPlayer, IWebSocket } from '../types/types';
import { checkUserInDB } from '../utils/checkUserInDB';

export function handleRegistration(ws: IWebSocket, data: Omit<IPlayer, 'index' | 'wins' | 'socket'>) {
  const result = checkUserInDB(ws, data);
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
}