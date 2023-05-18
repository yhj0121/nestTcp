import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'nestjs-redis';
import * as net from 'net';
import { Root } from 'protobufjs';
import { MsgInVehicleData } from '../proto/MSG_VehicleMonitoring';
@Injectable()
export class GatewayService {
  private server: net.Server;
  private protobufRoot: Root;
  private configService: ConfigService;
  private redisService: RedisService;

  constructor() {
    this.server = net
      .createServer((socket: net.Socket) => {
        socket.on('data', (data: Buffer) => {
          const decodeBuf = MsgInVehicleData.decode(data);
        });

        socket.on('error', () => {
          console.log('error connection');
        });

        socket.on('end', () => {
          console.log('socket end');
        });
      })
      .listen(this.configService.get('port'), () => {
        console.log('server start');
      });
  }
}
