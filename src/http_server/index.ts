import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

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

webSocketServer.on('connection', (socket: WebSocket) => {
  console.log('WebSocket connection established');

  socket.on('message', (message: any) => {
    console.log('Received message:', message);
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
