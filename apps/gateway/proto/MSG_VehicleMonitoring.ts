/* eslint-disable */
import * as _m0 from 'protobufjs/minimal';

//protoc --plugin=/Users/it_dev/Downloads/live_server_cache/node_modules/.bin/protoc-gen-ts_proto --ts_proto_opt=addNestjsRestParameter=true --ts_proto_out=/Users/it_dev/Downloads/live_server_cache/apps/gateway/proto --proto_path=/Users/it_dev/Downloads/live_server_cache/apps/gateway/proto   MSG_VehicleMonitoring.proto
export const protobufPackage = 'ServerData';

/** Google Protocol Buffers Version 3. */

export interface MsgInVehicleData {
  /** 0 : off-line    1: on-line */
  operationMode: number;
  /** 0: 아반떼, 1: 소나타 */
  vehicleType: number;
  /** 0 :제어 Off   1: 제어 On */
  control: number;
  /** 0 : off    1 : on */
  u8Brake: number;
  /** 0 : n단 1: d단  2: r단 3: p단 */
  u8Gear: number;
  /** 0 : off 1: 좌측 2: 우측 */
  u8TurnSignal: number;
  /** 차량 속도(kph) */
  f64SpeedKph: number;
  /** 핸들 각도 (-180 ~ 180) */
  f64SteeringAngleDeg: number;
}

function createBaseMsgInVehicleData(): MsgInVehicleData {
  return {
    operationMode: 0,
    vehicleType: 0,
    control: 0,
    u8Brake: 0,
    u8Gear: 0,
    u8TurnSignal: 0,
    f64SpeedKph: 0,
    f64SteeringAngleDeg: 0,
  };
}

export const MsgInVehicleData = {
  encode(
    message: MsgInVehicleData,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.operationMode !== 0) {
      writer.uint32(8).uint32(message.operationMode);
    }
    if (message.vehicleType !== 0) {
      writer.uint32(16).uint32(message.vehicleType);
    }
    if (message.control !== 0) {
      writer.uint32(24).uint32(message.control);
    }
    if (message.u8Brake !== 0) {
      writer.uint32(32).uint32(message.u8Brake);
    }
    if (message.u8Gear !== 0) {
      writer.uint32(40).uint32(message.u8Gear);
    }
    if (message.u8TurnSignal !== 0) {
      writer.uint32(48).uint32(message.u8TurnSignal);
    }
    if (message.f64SpeedKph !== 0) {
      writer.uint32(57).double(message.f64SpeedKph);
    }
    if (message.f64SteeringAngleDeg !== 0) {
      writer.uint32(65).double(message.f64SteeringAngleDeg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInVehicleData {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInVehicleData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.operationMode = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.vehicleType = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.control = reader.uint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.u8Brake = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.u8Gear = reader.uint32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.u8TurnSignal = reader.uint32();
          continue;
        case 7:
          if (tag !== 57) {
            break;
          }

          message.f64SpeedKph = reader.double();
          continue;
        case 8:
          if (tag !== 65) {
            break;
          }

          message.f64SteeringAngleDeg = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgInVehicleData {
    return {
      operationMode: isSet(object.operationMode)
        ? Number(object.operationMode)
        : 0,
      vehicleType: isSet(object.vehicleType) ? Number(object.vehicleType) : 0,
      control: isSet(object.control) ? Number(object.control) : 0,
      u8Brake: isSet(object.u8Brake) ? Number(object.u8Brake) : 0,
      u8Gear: isSet(object.u8Gear) ? Number(object.u8Gear) : 0,
      u8TurnSignal: isSet(object.u8TurnSignal)
        ? Number(object.u8TurnSignal)
        : 0,
      f64SpeedKph: isSet(object.f64SpeedKph) ? Number(object.f64SpeedKph) : 0,
      f64SteeringAngleDeg: isSet(object.f64SteeringAngleDeg)
        ? Number(object.f64SteeringAngleDeg)
        : 0,
    };
  },

  toJSON(message: MsgInVehicleData): unknown {
    const obj: any = {};
    message.operationMode !== undefined &&
      (obj.operationMode = Math.round(message.operationMode));
    message.vehicleType !== undefined &&
      (obj.vehicleType = Math.round(message.vehicleType));
    message.control !== undefined &&
      (obj.control = Math.round(message.control));
    message.u8Brake !== undefined &&
      (obj.u8Brake = Math.round(message.u8Brake));
    message.u8Gear !== undefined && (obj.u8Gear = Math.round(message.u8Gear));
    message.u8TurnSignal !== undefined &&
      (obj.u8TurnSignal = Math.round(message.u8TurnSignal));
    message.f64SpeedKph !== undefined &&
      (obj.f64SpeedKph = message.f64SpeedKph);
    message.f64SteeringAngleDeg !== undefined &&
      (obj.f64SteeringAngleDeg = message.f64SteeringAngleDeg);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgInVehicleData>, I>>(
    base?: I,
  ): MsgInVehicleData {
    return MsgInVehicleData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgInVehicleData>, I>>(
    object: I,
  ): MsgInVehicleData {
    const message = createBaseMsgInVehicleData();
    message.operationMode = object.operationMode ?? 0;
    message.vehicleType = object.vehicleType ?? 0;
    message.control = object.control ?? 0;
    message.u8Brake = object.u8Brake ?? 0;
    message.u8Gear = object.u8Gear ?? 0;
    message.u8TurnSignal = object.u8TurnSignal ?? 0;
    message.f64SpeedKph = object.f64SpeedKph ?? 0;
    message.f64SteeringAngleDeg = object.f64SteeringAngleDeg ?? 0;
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
