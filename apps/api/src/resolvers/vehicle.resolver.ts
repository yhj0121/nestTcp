import { ConfigService } from '@nestjs/config';
import { PubSub } from 'graphql-subscriptions';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Vehicle } from '../dto/Vehicle.dto';
import { convertToVehicleType } from '../convert/convertToVehicleType';
import { Cron, Interval } from '@nestjs/schedule';
import { Inject } from '@nestjs/common';

@Resolver()
export class VehicleResolver {
  static special_period = `${VehicleResolver.name}).special_period`;

  constructor(
    private pubsub: PubSub,
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService,
    @Inject(VehicleResolver.special_period)
    private readonly special_week: number,
  ) {}

  @Mutation(() => Vehicle)
  async publishSubscription(@Args('operationMode') id: string) {
    const redisData = convertToVehicleType(
      JSON.parse(await this.redis.get(id)),
    );
    // this.pubsub.publish('getVehicle', {
    //   getVehicle: redisData,
    // });

    setInterval(() => {
      this.pubsub.publish('getVehicle', {
        getVehicle: redisData,
      });
    }, this.special_week);

    return redisData;
  }
  @Subscription(() => Vehicle, {
    filter: (payload, variable) => {
      return payload.operationMode === variable.id; //variable 인자 payload publish 할떄 들어가는 값
    },
  })
  async getVehicle(): Promise<AsyncIterator<Vehicle>> {
    return this.pubsub.asyncIterator('getVehicle');
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
