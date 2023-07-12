import { ConfigModule, registerAs } from '@nestjs/config';
import { initConfigModules } from './../src/config/index';
export const REDIS = 'REDIS';
export const MAIN_DATABASE = 'POSRGRES';
export const DOCKER_COMPOSE = 'DOCKER';
export const AUTH = 'AUTH';

export enum REDIS_INFO {
  HOST = 'HOST',
  PORT = 'PORT',
}

export enum MAIN_DATABASE_INFO {
  HOST = 'HOST',
  PORT = 'PORT',
  USERNAME = 'USERNAME',
  PASSWORD = 'PASSWORD',
  DATABASE = 'DATABASE',
  SCHEMA = 'SCHEMA',
}

export enum DOCKER_COMPOSE_INFO {
  USER = 'USER',
  PASSWORD = 'PASSWORD',
}

export enum AUTH_INFO {
  JWTSECRET = 'JWTSECRET',
  PERIOD = 'PERIOD',
}

export const configModuleSet = () => {
  return [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [
        registerAs(MAIN_DATABASE, () => {
          return {
            [MAIN_DATABASE_INFO.HOST]: process.env.DB_HOST,
            [MAIN_DATABASE_INFO.PORT]: process.env.DB_PORT,
            [MAIN_DATABASE_INFO.USERNAME]: process.env.DB_USERNAME,
            [MAIN_DATABASE_INFO.DATABASE]: process.env.DB_DATABASE,
            [MAIN_DATABASE_INFO.SCHEMA]: process.env.DB_SCHEMA,
          };
        }),
        registerAs(REDIS, () => {
          return {
            [REDIS_INFO.HOST]: process.env.DB_HOST,
            [REDIS_INFO.PORT]: process.env.DB_PORT,
          };
        }),
        registerAs(AUTH, () => {
          return {
            [AUTH_INFO.JWTSECRET]: process.env.JWT_SECRET,
            [AUTH_INFO.PERIOD]: process.env.SPECIAL_PERIOD,
          };
        }),
        registerAs(DOCKER_COMPOSE, () => {
          return {
            [DOCKER_COMPOSE_INFO.USER]: process.env.DOCKER_USER,
            [DOCKER_COMPOSE_INFO.PASSWORD]: process.env.DOCKER_PASSWORD,
          };
        }),
      ],
    }),
  ];
};
