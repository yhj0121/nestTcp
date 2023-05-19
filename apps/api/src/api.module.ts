import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { VehicleResolver } from './resolvers/vehicle.resolver';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true, // 웹소켓 사용 가능하게 해줌
      autoSchemaFile: __dirname + 'schema.gpl', //자동으로 스키마 파일 생성
      subscriptions: {
        'graphql-ws': true,
      },
      path: 'app/graphql',
      sortSchema: false,
      context: ({ req, connection }) => {
        //req는 http 요청 정보 connection은 웹 소켓 실시간 정보쓸때 사용
        /// { //graphql에게 request를 요청할때 req안으로 jwt토큰이 담깁니다.
        if (req) {
          return req;
        } else {
          return connection;
        }
      },
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule import
      inject: [ConfigService], // ConfigService 주입
      useFactory: (configService: ConfigService) => ({
        config: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env', // .env 파일의 경로를 지정합니다.
      isGlobal: true, // 전역적으로 사용할 수 있도록 설정합니다.
    }),
  ],
  providers: [ApiService, VehicleResolver, PubSub],
})
export class ApiModule {}
