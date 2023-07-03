import * as path from 'path';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({
  path: path.resolve(process.cwd(), '.env'),
}); //결

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_SCHEMA } =
  process.env;

const dataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  schema: DB_SCHEMA,
  synchronize: false,
  logging: false,
  entities: ['libs/persistence/src/entities/*.entity.{js,ts}'],
  migrations: ['migrations/*.{js,ts}'],
});

export default dataSource;
