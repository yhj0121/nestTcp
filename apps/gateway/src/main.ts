import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(GatewayModule);
  const configService = app.get(ConfigService);
  await app.listen();
}
bootstrap();
