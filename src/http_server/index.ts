import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { handlePlayerRequest } from './controllers/playerController';
import { handleUpdateRoomState } from './controllers/roomController';
import { stringifyObject } from './utils/websocketUtil';
import { getPlayerData } from './services/playerService';

export const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(''));
  const file_path =
    __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

const webSocketServer = new WebSocketServer({ server: httpServer });
const clients: Set<WebSocket> = new Set();

webSocketServer.on('connection', (socket: WebSocket) => {
  console.log('WebSocket connection established');
  clients.add(socket);

  socket.on('message', (message: any) => {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);

    if (parsedMessage.type === 'login') {
      const playerName = JSON.parse(parsedMessage.data).name;
      const playerData = getPlayerData(playerName);
      if (playerData) {
        console.log('Player data:', playerData);
      } else {
        console.log('Player not found');
      }
    }

    const result = handlePlayerRequest(parsedMessage);
    socket.send(stringifyObject(result));
    handleUpdateRoomState(clients);
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
