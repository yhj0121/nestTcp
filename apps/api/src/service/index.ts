import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { VehicleService } from './vehicle.service';

export const services = [
  AuthService,
  VehicleService,
  UserService,
  {
    provide: UserService.SALTTYPE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        salt: configService.get('HASH_SALT') as number,
        type: configService.get('HASH_TYPE') as string,
      };
    },
  },
];
