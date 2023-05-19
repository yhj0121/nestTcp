import { PubSub } from 'graphql-subscriptions';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Vehicle } from '../\bdto/Vehicle.dto';

@Resolver()
export class VehicleResolver {
  constructor(
    private pubsub: PubSub,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Mutation(() => Boolean)
  async publishSubscription(@Args('operationMode') id: string) {
    const redisData = this.redis.get(id);
    const getRedisData = this.pubsub.publish('getVehicle', { redisData });
    if (getRedisData) {
      return true;
    } else {
      return false;
    }
  }
  @Subscription((returns) => Vehicle)
  async getVehicle() {
    return this.pubsub.asyncIterator('getVehicle');
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
