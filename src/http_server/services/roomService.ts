import { Room } from 'http_server/models/roomModel';

const rooms: { [key: string]: Room } = {};

export const createRoom = (
  playerName: string,
): { roomId: string; error: boolean; errorText: string } => {
  const roomId = generateRoomId();
  rooms[roomId] = {
    roomId,
    roomUsers: [{ name: playerName, index: generatePlayerIndex() }],
  };
  return { roomId, error: false, errorText: '' };
};

export const addUserToRoom = (
  roomId: string,
  playerName: string,
): { idGame: string; idPlayer: string; error: boolean; errorText: string } => {
  const room = rooms[roomId];

  if (!room) {
    return {
      idGame: '',
      idPlayer: '',
      error: true,
      errorText: 'Room not found.',
    };
  }

  if (room.roomUsers.length >= 2) {
    return {
      idGame: '',
      idPlayer: '',
      error: true,
      errorText: 'Room is already full.',
    };
  }

  const playerIndex = generatePlayerIndex();
  room.roomUsers.push({ name: playerName, index: playerIndex });

  if (room.roomUsers.length === 2) {
    const gameId = generateGameId();
    return {
      idGame: gameId,
      idPlayer: playerIndex,
      error: false,
      errorText: '',
    };
  }

  return { idGame: '', idPlayer: playerIndex, error: false, errorText: '' };
};

export const updateRoomState = (): Array<Room> => {
  return Object.values(rooms);
};

const generateRoomId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

const generatePlayerIndex = (): string => {
  return Math.random().toString(36).substr(2, 5);
};

const generateGameId = (): string => {
  return Math.random().toString(36).substr(2, 8);
};
