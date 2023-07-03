import { ConfigModule } from '@nestjs/config';
export const initConfigModules = () => {
  return [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ];
};
