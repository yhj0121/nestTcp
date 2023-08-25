import { userDto } from './../dto/user.dto';
import { User } from '@app/entity/entities/user.entity';

export function convertToVehicleType(users: User): userDto {
  return {
    userId: users.userId,
    hash: users.hash,
    salt: users.salt,
    email: users.email,
    address: users.address,
  } as userDto;
}
