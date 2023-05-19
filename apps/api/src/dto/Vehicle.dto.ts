import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field() operationMode: number;

  @Field() vehicleType: number;

  @Field() control: number;

  @Field() u8Brake: number;

  @Field() u8Gear: number;

  @Field() u8TurnSignal: number;

  @Field() f64SpeedKph: number;

  @Field() f64SteeringAngleDeg: number;
}
