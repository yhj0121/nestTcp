import { Users } from '@app/entity/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async validateUser(token: string, payload) {
    if (!payload.userId) {
      throw new Error('payload userId Invaild');
    }
    if (!token) {
      throw new Error('token not valid'); //여기는 token 하고 다른데에 저장된 token 하고 비교하는 부분
    }
    return this.userRepository.find({});
  }
}
