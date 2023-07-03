import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import Redis from 'ioredis';

const EXPIRE_TIME_SEC = 60;

@Injectable()
export class VehicleService {
  constructor(private readonly redis: Redis) {}

  async searchCacheDatas(payload?: string) {
    return payload ? this.redis.get(payload) : this.redis.mget('*');
  }

  async addCacheData(payload) {
    const setCacheData = this.redis.set(
      payload.id,
      JSON.stringify(payload),
      'EX',
      EXPIRE_TIME_SEC,
    );
  }
}
