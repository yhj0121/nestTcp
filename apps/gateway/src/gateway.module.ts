import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisModule } from '@nestjs-modules/ioredis';

import { GatewayService } from './services/gateway.service';
import { RedisService } from './services/redis.service';
import { GQL_SERVICES } from './services';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule import
      inject: [ConfigService], // ConfigService 주입
      useFactory: async (configService: ConfigService) => ({
        config: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
        },
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env', // .env 파일의 경로를 지정합니다.
      isGlobal: true, // 전역적으로 사용할 수 있도록 설정합니다.
    }),
  ],
  providers: [...GQL_SERVICES],
  exports: [GatewayModule, ...GQL_SERVICES],
})
export class GatewayModule {}
