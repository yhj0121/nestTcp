import { RedisService } from './../../../gateway/src/services/redis.service';
import { ConfigService } from '@nestjs/config';
import { PubSub } from 'graphql-subscriptions';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Vehicle } from '../dto/Vehicle.dto';
import { convertToVehicleType } from '../mapper/convertToVehicleType';
import { Inject, Module } from '@nestjs/common';

@Resolver()
export class VehicleResolver {
  static special_period = `${VehicleResolver.name}).special_period`;

  constructor(
    private pubsub: PubSub,
    @InjectRedis() private readonly redis: Redis,
    private readonly redisService: RedisService,
    @Inject(VehicleResolver.special_period)
    private readonly special_period: number,
  ) {
    setInterval(async () => {
      const redisData: Vehicle = convertToVehicleType(
        JSON.parse(await redisService.getCache('1')),
      );
      this.pubsub.publish('getVehicle', {
        getVehicle: redisData,
      });
    }, this.special_period);
  }

  @Subscription(() => [Vehicle], {
    filter: (payload, variable) => {
      return payload.operationMode === variable.mode; //variable 인자 payload publish 할떄 들어가는 값
    },
  })
  async getVehicle(variable: {
    name: string;
  }): Promise<AsyncIterator<Vehicle>> {
    if (variable) return this.pubsub.asyncIterator('getVehicle');
    else return this.pubsub.asyncIterator('getAllVehicle');
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
