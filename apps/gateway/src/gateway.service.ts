import { Injectable } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class GatewayService {
  private server: net.Server;
  constructor() {
    this.server = net.createServer(this.handleConnection);
  }

  start(port: number) {
    this.server.listen(port, '0.0.0.0', () => {
      console.log(`Gateway Server is running on port ${port}`);
    });
  }

  handleConnection(socket: net.Socket) {
    console.log('New client connected');

    socket.on('data', (data) => {
      // 데이터를 Protocol Buffer로 역직렬화
      const deserializedData: VehicleData = VehicleData.deserializeBinary(data);

      // 데이터 처리 로직을 구현하세요
      console.log('Received data:', deserializedData);

      // 클라이언트에게 응답을 보내는 로직을 구현할 수도 있습니다
      // socket.write('Received data successfully');
    });

    socket.on('end', () => {
      console.log('Client disconnected');
    });
  }
}
