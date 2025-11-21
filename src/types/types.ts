import { WebSocket } from 'ws';

export interface IWebSocket extends WebSocket {
  id: string;
  playerName: string;
}

export interface IPlayer {
  index: string,
  name: string,
  password: string,
  wins: number,
  socket: IWebSocket
}

export interface IRoom {
  roomId: string,
  roomUsers: Omit<IPlayer, 'password' | 'wins' | 'socket'>[]
}

export interface IDataBase {
  players: IPlayer[],
  rooms: IRoom[],
  games: unknown[]
}
