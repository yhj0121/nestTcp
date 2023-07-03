// import { ConfigService } from '@nestjs/config';
// import { VehicleResolver } from './vehicle.resolver';

// export const Resolvers = [
//   VehicleResolver,
//   {
//     provide: VehicleResolver.special_period,
//     inject: [ConfigService],
//     useFactory: async (configService: ConfigService) => {
//       return configService.get('SPECIAL_PERIOD');
//     },
//   },

//   // {
//   //   provide: VehicleResolver.props,
//   //   inject: [ConfigService],
//   //   useFactory: async (configService: ConfigService) => {
//   //     return {
//   //       name: 'yoon',
//   //       password: 'asdfzxcv12',
//   //     };
//   //   },
//   // }, 이런식으로 객체형식으로 보내줄수도 있다.
// ];
