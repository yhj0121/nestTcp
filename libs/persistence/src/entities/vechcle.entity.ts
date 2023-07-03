import { vehicleTypeEnum } from './../../../../apps/api/src/dto/Vehicle.dto';
import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Vehicles {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'vehicleTypes' })
  vehicleType: string;

  @Column()
  control: string;

  @Column({ name: 'u8_break' })
  break: string;

  @Column({ name: 'u8_gear' })
  gaer: string;

  @Column({ name: 'u8TurnSignal' })
  turnSignal: string;

  @Column({ name: 'f64SpeedKph' })
  vehicleSpeeds: number;

  @Column({ name: 'f64SteeringAngleDeg' })
  streetAngle: number;
}
