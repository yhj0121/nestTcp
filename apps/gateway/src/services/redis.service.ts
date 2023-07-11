import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Vehicle } from 'apps/api/src/dto/Vehicle.dto';

@Injectable()
export class RedisService {
  static TIME_EXPIRE = `TIme_expire`;
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService,
    @Inject(RedisService.TIME_EXPIRE)
    private readonly TIME_EXPIRE: number
  ) {}

  async setCache(data) {
    // this.isCache(data);
    return await this.redis.set(data.operationMode, JSON.stringify(data), 'EX', this.TIME_EXPIRE);
  }

  // async isCache(data) {
  //   const redisKey = data.operationMode;
  //   const getRedis = this.redis.get(redisKey);
  //   if (await getRedis) {
  //     this.redis.del(redisKey);
  //   }
  // }
  async getCache(id: string): Promise<string> {
    return this.redis.get(id);
  }

  async getAllCache(): Promise<string[]> {
    const totalKey = await this.redis.keys('*');
    return await this.redis.mget(totalKey);
  }

  async deleteSubCache() {
    return await this.redis.del();
  }

  async getCacheKey(vehicleType?) {
    if (vehicleType === undefined && vehicleType === null) {
      return `InVehicleInfo:*`;
    } else {
      return `InVehicleInfo:${vehicleType}`;
    }
  }
}
