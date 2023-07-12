import { RedisService } from './redis.service';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as net from 'net';
import { Root } from 'protobufjs';
import { MsgInVehicleData } from '../../proto/MSG_VehicleMonitoring';
@Injectable()
export class GatewayService {
  private server: net.Server;
  private protobufRoot: Root;

  constructor(private configService: ConfigService, private redisService: RedisService) {
    this.server = net
      .createServer((socket: net.Socket) => {
        //client에서 데이터가 들어올때 하는거
        socket.on('data', (data: Buffer) => {
          const decodeBuf = MsgInVehicleData.decode(data);
          console.log(decodeBuf, 'ds');
          this.redisService.setCache(decodeBuf);
        });

        socket.on('error', () => {
          console.log('error connection');
        });

        socket.on('end', () => {
          console.log('socket end');
        });
      })
      .listen(configService.get<number>('PORT'), () => {
        console.log('server start');
      });
  }
}
