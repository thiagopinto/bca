// src/statistics/statistics.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // ou configure conforme seu frontend
  },
})
export class StatisticsGateway {
  @WebSocketServer()
  server: Server;

  /*   constructor() {
    this.server = new Server({
      cors: {
        origin: '*', // ou configure conforme seu frontend
      },
    });
  } */

  broadcastStatistics(statistics: any) {
    this.server.emit('statistics_update', statistics);
  }
}
