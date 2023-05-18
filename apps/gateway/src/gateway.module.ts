import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'redis_service',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env', // .env 파일의 경로를 지정합니다.
      isGlobal: true, // 전역적으로 사용할 수 있도록 설정합니다.
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService, RedisService],
})
export class GatewayModule {}
