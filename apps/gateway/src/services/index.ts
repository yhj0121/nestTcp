import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { GatewayService } from './gateway.service';
export const Services = [
  GatewayService,
  RedisService,
  {
    provide: GatewayService.portNUmber,
    inject: [ConfigService],
    useFactory: async (configservice: ConfigService) => {
      return configservice.get<number>('port') as number;
    },
  },
  {
    provide: RedisService.TIME_EXPIRE,
    inject: [ConfigService],
    userFactory: async (configservice: ConfigService) => {
      return configservice.get('TIME_EXPIRE') as number;
    },
  },
];
