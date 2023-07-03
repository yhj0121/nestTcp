import { AuthService } from './service/auth.service';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { VehicleResolver } from './resolvers/vehicle.resolver';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { PubSub } from 'graphql-subscriptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entityList } from '@app/entity/entities';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GatewayModule } from 'apps/gateway/src/gateway.module';
import { GQL_SERVICES } from 'apps/gateway/src/services';
import { Services } from './service';
import { jwtStrategy } from './Auth/jwt.strategy';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true, // 웹소켓 사용 가능하게 해줌
      autoSchemaFile: __dirname + 'schema.gpl', //자동으로 스키마 파일 생성
      subscriptions: {
        // 'graphql-ws': true,
        // 'subscriptions-transport-ws': {
        //   path: '/graphql',
        // },
        'subscriptions-transport-ws': true,
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
    GatewayModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], //configServer 쓰겠다
      //useFactory : 프로바이더가 동작할 방식을 결정한다.
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        schema: configService.get('DB_SCHEMA'),
        entities: entityList,
        synchronize: false, //query 할때마다 로그 띄워줌
      }),
    }),
    JwtModule.register({
      global: true,
      secret: 'serert',
      signOptions: { expiresIn: '60s' },
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
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  providers: [
    jwtStrategy,
    ApiService,
    VehicleResolver,
    PubSub,
    ...Services,
    ...GQL_SERVICES,
  ],
})
export class ApiModule {}
