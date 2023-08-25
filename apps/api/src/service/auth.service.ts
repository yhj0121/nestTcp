import { loginInput } from './../dto/user.dto';
import { User } from '@app/entity/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import * as crypto from 'crypto';
import { AuthenticationError } from '@nestjs/apollo';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly logger = new Logger(AuthService.name)
  ) {}
  async validateUser(token: string, payload) {
    if (!payload.userId) {
      throw new Error('payload userId Invaild');
    }
    if (!token) {
      throw new Error('token not valid'); //여기는 token 하고 다른데에 저장된 token 하고 비교하는 부분
    }
  }

  async login(loginInput: loginInput) {
    const { userId, password } = loginInput;
    const userInfo = await this.userRepository.findOne({
      where: { userId },
    });
    const { salt, hash } = userInfo;

    const hashPassword = crypto.pbkdf2Sync(password, salt, 100, 64, 'sha512').toString('base64');
    if (hash !== hashPassword) {
      this.logger.error(`password not invalid ${password}`);
      throw new AuthenticationError('password not valide ');
    }
  }
}
