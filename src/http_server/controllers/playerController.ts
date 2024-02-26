import { addUserToRoom, createRoom } from '../services/roomService';
import { registerPlayer } from '../services/playerService';
import { addShipsToGame, getShipsForGame } from '../services/shipsService';

export const handlePlayerRequest = (
  request: any,
): { type: string; data: any; id: number } => {
  switch (request.type) {
    case 'reg':
      return handleRegistration(request);
    case 'create_room':
      return handleCreateRoom(request);
    case 'add_user_to_room':
      return handleAddUserToRoom(request);
    case 'add_ships':
      return handleAddShips(request);
    case 'start_game':
      return handleStartGame(request);

    default:
      return {
        type: 'error',
        data: { errorText: 'Invalid request type' },
        id: 0,
      };
  }
};

const handleRegistration = (
  request: any,
): { type: string; data: any; id: number } => {
  const { name, password } = JSON.parse(request.data);
  const result = registerPlayer(name, password);

  return {
    type: 'reg',
    data: {
      name,
      index: result.index,
      error: result.error,
      errorText: result.errorText,
    },
    id: 0,
  };
};

const handleCreateRoom = (
  request: any,
): { type: string; data: any; id: number } => {
  console.log(request);

  const playerName = getPlayerNameById(request.id);
  const result = createRoom(playerName);

  if (!result.error) {
    return {
      type: 'create_room',
      data: '',
      id: 0,
    };
  }

  return {
    type: 'error',
    data: { errorText: result.errorText },
    id: 0,
  };
};

const handleAddUserToRoom = (
  request: any,
): { type: string; data: any; id: number } => {
  const playerName = getPlayerNameById(request.id);
  const result = addUserToRoom(request.data.indexRoom, playerName);

  return {
    type: 'create_game',
    data: {
      idGame: result.idGame,
      idPlayer: result.idPlayer,
      error: result.error,
      errorText: result.errorText,
    },
    id: 0,
  };
};

const handleAddShips = (
  request: any,
): { type: string; data: any; id: number } => {
  const { gameId, ships, indexPlayer } = JSON.parse(request.data);

  const success = addShipsToGame({ gameId, ships, indexPlayer });

  if (success) {
    return {
      type: 'start_game',
      data: { ships, currentPlayerIndex: indexPlayer },
      id: 0,
    };
  }

  return {
    type: 'error',
    data: { errorText: 'Failed to add ships to the game.' },
    id: 0,
  };
};

const handleStartGame = (
  request: any,
): { type: string; data: any; id: number } => {
  const { gameId, indexPlayer } = JSON.parse(request.data);

  const ships = getShipsForGame(gameId, indexPlayer);

  if (ships) {
    return {
      type: 'start_game',
      data: { ships, currentPlayerIndex: indexPlayer },
      id: 0,
    };
  }

  return {
    type: 'error',
    data: { errorText: 'Ships data not found for the game.' },
    id: 0,
  };
};

const getPlayerNameById = (id: number): string => {
  return 'Player' + id;
};
