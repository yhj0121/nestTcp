import { loginInput } from './../dto/user.dto';
import { User } from '@app/entity/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  async validateUser(token: string, payload) {
    if (!payload.userId) {
      throw new Error('payload userId Invaild');
    }
    if (!token) {
      throw new Error('token not valid'); //여기는 token 하고 다른데에 저장된 token 하고 비교하는 부분
    }
  }

  async login(loginInput: loginInput): Promise<boolean> {
    const { userId, password } = loginInput;
    const userInfo = await this.userRepository.findOne({
      where: { userId },
    });
    userInfo;
  }
}
