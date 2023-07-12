import { userDto } from './../dto/user.dto';
import { User } from '@app/entity/entities/user.entity';

export function convertToVehicleType(users: User): userDto {
  return {
    userId: users.userId,
    password: users.password,
    email: users.email,
    address: users.address,
  } as userDto;
}
