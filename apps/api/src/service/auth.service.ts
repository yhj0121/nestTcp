import { User } from '@app/entity/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private dataSource: DataSource) {}
  async validateUser(token: string, payload) {
    if (!payload.userId) {
      throw new Error('payload userId Invaild');
    }
    if (!token) {
      throw new Error('token not valid'); //여기는 token 하고 다른데에 저장된 token 하고 비교하는 부분
    }
    const QueryRunner = this.dataSource.createQueryRunner();
    await QueryRunner.connect();

    await QueryRunner.startTransaction();

    try {
      await QueryRunner.manager.save(User, { id: 1 });
      await QueryRunner.manager.save(User, { id: 2 });

      await QueryRunner.commitTransaction();
    } catch (e) {
      QueryRunner && (await QueryRunner.rollbackTransaction());

      throw e;
    } finally {
      QueryRunner && (await QueryRunner.release());
    }
  }
}
