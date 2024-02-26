import { registerPlayer, authenticatePlayer } from '../services/playerService';

export const handlePlayerRequest = (
  request: any,
): { type: string; data: any; id: number } => {
  switch (request.type) {
    case 'reg':
      return handleRegistration(request);
    case 'login':
      return handleLogin(request);
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

const handleLogin = (request: any): { type: string; data: any; id: number } => {
  const { name, password } = request.data;
  const result = authenticatePlayer(name, password);

  return {
    type: 'login',
    data: {
      name,
      index: result.index,
      error: result.error,
      errorText: result.errorText,
    },
    id: 0,
  };
};
