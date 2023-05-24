import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum operationModeEnum {
  'OFF-LINE' = 0,
  'ON-LINE' = 1,
}

export enum vehicleTypeEnum {
  '아반떼',
  '소나타',
}

export enum controlEnum {
  '제어 on' = 0,
  '제어 off' = 1,
}

export enum u8BrakeEnum {
  'off' = 0,
  'on' = 1,
}

export enum u8GearEnum {
  'n단' = 0,
  'd단' = 1,
  'r단' = 2,
  'p단' = 3,
}

export enum u8TurnSignalEnum {
  'off' = 0,
  '좌측' = 1,
  '우측' = 2,
}

// registerEnumType(operationModeEnum, {
//   name: 'operationModeEnum',
// });

// registerEnumType(vehicleTypeEnum, {
//   name: 'vehicleTypeEnum',
// });

// registerEnumType(controlEnum, {
//   name: 'controlEnum',
// });

// registerEnumType(u8BrakeEnum, {
//   name: 'u8BrakeEnum',
// });

// registerEnumType(u8GearEnum, {
//   name: 'u8GearEnum',
// });

// registerEnumType(u8TurnSignalEnum, {
//   name: 'u8TurnSignalEnum',
// });

@ObjectType()
export class Vehicle {
  @Field() operationMode: string;

  @Field() vehicleType: string;

  @Field() control: string;

  @Field() u8Brake: string;

  @Field() u8Gear: string;

  @Field() u8TurnSignal: string;

  @Field() f64SpeedKph: number;

  @Field() f64SteeringAngleDeg: number;
}
