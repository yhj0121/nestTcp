import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { VehicleService } from './vehicle.service';

export const Services = [
  AuthService,
  VehicleService,
  UserService,
  {
    provide: UserService.SALTTYPE,
    inject: [ConfigService],
    useFactory: async (cofnigservice: ConfigService) => {
      return {
        salt: cofnigservice.get('HASH_SALT') as number,
        type: cofnigservice.get('HASH_TYPE'),
      };
    },
  },
];
