import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { GatewayService } from './gateway.service';
export const GQL_SERVICES = [
  RedisService,
  {
    provide: RedisService.TIME_EXPIRE,
    inject: [ConfigService],
    useFactory: async (configservice: ConfigService) => {
      return configservice.get('TIME_EXPIRE') as number;
    },
  },
];
