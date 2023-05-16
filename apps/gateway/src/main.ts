import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GatewayModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',

        port: 8080,
      },
    },
  );
  console.log(__dirname);
  await app.listen();
}
bootstrap();
