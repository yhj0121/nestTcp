import { cryptoInput, signupInput } from './../dto/user.dto';
import { User } from './../../../../libs/persistence/src/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  static SALTTYPE: cryptoInput;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(UserService.SALTTYPE)
    private readonly SALTTYPE
  ) {}

  async getEmailAddress(userid): Promise<string> {
    try {
      const emails = await this.userRepository.findOne({
        where: {
          id: userid,
        },
      });
      if (emails) {
        return emails.email; //dto에 맞춘다음 변환
      }
    } catch (e) {
      throw new Error('에러 발생');
    }
  }

  async signup(signupInput: signupInput) {
    const { password, ...without } = signupInput;
    const withoutPassword = { ...without };

    const salt = crypto.randomBytes(this.SALTTYPE.salt);
    const hash = crypto.pbkdf2Sync(password, salt.toString('base64'), 100, 64, 'sha512').toString('base64');
  }

  async changePassword(password: string) {
    //인증 수단 필요
  }
}
