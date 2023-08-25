import { loginInput } from './../dto/user.dto';
import { User } from '@app/entity/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async validateUser(token: string, payload) {
    if (!payload.userId) {
      throw new Error('payload userId Invalid');
    }
    if (!token) {
      throw new Error('token not valid');
    }
  }

  async login(loginInput: loginInput) {
    const { userId, password } = loginInput;
    const userInfo = await this.userRepository.findOne({
      where: { userId },
    });

    if (!userInfo) {
      throw new Error('User not found'); // 유저가 존재하지 않을 때 처리 필요
    }

    const { salt, hash } = userInfo;

    const hashPassword = crypto.pbkdf2Sync(password, salt, 100, 64, 'sha512').toString('base64');
    if (hash !== hashPassword) {
      this.logger.error(`password not invalidss ${password}`);
    }
  }
}
