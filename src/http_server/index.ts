import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { handlePlayerRequest } from './controllers/playerController';
import { stringifyObject } from './utils/websocketUtil';
import { handleUpdateRoomState } from './controllers/roomController';

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

    const result = handlePlayerRequest(parsedMessage);
    socket.send(stringifyObject(result));

    if (parsedMessage.type == 'reg' || parsedMessage.type == 'create_room') {
      handleUpdateRoomState(clients);
    }
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
