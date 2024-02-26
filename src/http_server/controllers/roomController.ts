import { updateRoomState } from '../services/roomService';
import { stringifyObject } from '../utils/websocketUtil';
import WebSocket from 'ws';

export const handleUpdateRoomState = (clients: Set<WebSocket>): void => {
  const updatedRoomState = updateRoomState();
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        stringifyObject({
          type: 'update_room',
          data: updatedRoomState,
          id: 0,
        }),
      );
    }
  });
};
