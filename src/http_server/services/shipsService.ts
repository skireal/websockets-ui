import { ShipsData, Ship } from 'http_server/models/shipsModel';

const gameSessions: { [key: string]: ShipsData } = {};

export const addShipsToGame = (data: ShipsData): boolean => {
  console.log('ships');

  console.log(data);

  const { gameId, ships, indexPlayer } = data;

  if (gameSessions[gameId]) {
    (gameSessions[gameId] as any)[indexPlayer] = ships;
    return true;
  }

  return true;
};

export const getShipsForGame = (
  gameId: string,
  indexPlayer: string,
): Ship[] | undefined => {
  return (gameSessions[gameId] as any)?.[indexPlayer];
};
