import { ConfigService } from '@nestjs/config';
import { VehicleResolver } from './vehicle.resolver';

export const Resolvers = [
  VehicleResolver,
  {
    provide: VehicleResolver.special_period,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return configService.get('SPECIAL_PERIOD');
    },
  },
];
