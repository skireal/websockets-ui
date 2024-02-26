import { httpServer } from './src/http_server/index.js';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
//httpServer.listen(HTTP_PORT);

httpServer.listen(3000, () => {
  console.log('Сервер слушает порт 3000');
});
