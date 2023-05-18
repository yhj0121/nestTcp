import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setCache(data) {
    this.isCache(data);
    return await this.redis.set(data.operationMode, JSON.stringify(data));
  }

  private isCache(data) {
    const redisKey = data.operationMode;
    const getRedis = this.redis.get(redisKey);
    if (getRedis) {
      this.redis.del(redisKey);
    }
  }
  async getCache(id: string) {
    return await this.redis.get(id);
  }
}
