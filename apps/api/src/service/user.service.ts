import { User } from './../../../../libs/persistence/src/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
}
