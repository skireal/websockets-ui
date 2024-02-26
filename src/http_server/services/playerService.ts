import { Player } from 'http_server/models/playerModel';

const players: { [key: string]: Player } = {};

export const registerPlayer = (
  name: string,
  password: string,
): { index: string | number; error: boolean; errorText: string } => {
  if (players[name]) {
    return {
      index: 0,
      error: true,
      errorText: 'Player with this name already exists.',
    };
  }

  players[name] = { name, password };
  return { index: name, error: false, errorText: '' };
};

export const authenticatePlayer = (
  name: string,
  password: string,
): { index: string | number; error: boolean; errorText: string } => {
  const player = players[name];

  if (!player || player.password !== password) {
    return { index: 0, error: true, errorText: 'Invalid credentials.' };
  }

  return { index: name, error: false, errorText: '' };
};

export const getPlayerData = (name: string): Player | undefined => {
  return players[name];
};
