import { cryptoInput, signupInput } from './../dto/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { User } from '@app/entity/entities/user.entity';
@Injectable()
export class UserService {
  static SALTTYPE = 'sadf';

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(UserService.SALTTYPE)
    private readonly SALTTYPE: any
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

    const salt = crypto.randomBytes(this.SALTTYPE.length);
    const hash = crypto.pbkdf2Sync(password, salt.toString('base64'), 100, 64, 'sha512').toString('base64');
    return true;
  }

  // async changePassword(password: string) {
  //   //인증 수단 필요
  // }
}
