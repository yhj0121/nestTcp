import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisService {
  static TIME_EXPIRE = `${}`
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService,
  ) {}

  async setCache(data) {
    // this.isCache(data);
    return await this.redis.set(
      data.operationMode,
      JSON.stringify(data),
      'EX',
      this.configService.get('TIME_EXPIRE'),
    );
  }

  // async isCache(data) {
  //   const redisKey = data.operationMode;
  //   const getRedis = this.redis.get(redisKey);
  //   if (await getRedis) {
  //     this.redis.del(redisKey);
  //   }
  // }
  async getCache(id: string) {
    return await this.redis.get(id);
  }
}
