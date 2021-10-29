import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/studies' })
export class ItemsGateway {
  @WebSocketServer() wss: Server;
  @SubscribeMessage('studyToServer')
  handleMessage(): void {
    this.wss.emit('studyToClient', 'Hello World....');
  }

  @SubscribeMessage('studyToServer')
  sendToAll(doc: object) {
    this.wss.emit('studyToClient', doc);
  }
}
