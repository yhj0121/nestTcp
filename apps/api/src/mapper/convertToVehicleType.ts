import {
  controlEnum,
  operationModeEnum,
  u8BrakeEnum,
  u8GearEnum,
  u8TurnSignalEnum,
  Vehicle,
  vehicleTypeEnum,
} from '../dto/Vehicle.dto';
import { VehicleBuffer } from '../dto/VehicleBuffer.dto';

export function convertToVehicleType(vehicleType?: VehicleBuffer): Vehicle {
  return {
    operationMode: operationModeEnum[vehicleType?.operationMode],
    vehicleType: vehicleTypeEnum[vehicleType?.vehicleType],
    control: controlEnum[vehicleType?.control],
    u8Brake: u8BrakeEnum[vehicleType?.u8Brake],
    u8Gear: u8GearEnum[vehicleType?.u8Gear],
    u8TurnSignal: u8TurnSignalEnum[vehicleType?.u8TurnSignal],
    f64SpeedKph: vehicleType?.f64SpeedKph,
    f64SteeringAngleDeg: vehicleType?.f64SteeringAngleDeg,
  };
}
