// import { ConfigModule, registerAs } from '@nestjs/config';
// import * as Joi from 'joi';

// export const API_CONF_PROPERTY_PREFIX = 'API';
// export enum API_CONF_PROPERTY {
//   PORT = 'PORT',
//   API_ROOT_PATH = 'API_ROOT_PATH',
//   GRAPHQL_END_POINT = 'GRAPHQL_END_POINT',
//   SUBSCRIPTION_END_POINT = 'SUBSCRIPTION_END_POINT',
// }

// export const initConfigModules = () => {
//   return [
//     ConfigModule.forRoot({
//       envFilePath: '.env',
//       validationSchema: Joi.object({
//         REDIS_PORT: Joi.number().integer().required(),

//         REDIS_HOST: Joi.string().required,

//         PORT: Joi.number().integer().required(),
//       }),
//       load: [
//         registerAs(API_CONF_PROPERTY_PREFIX, () => {
//           return {
//             [API_CONF_PROPERTY.PORT]: process.env.port,
//           };
//         }),
//       ],
//     }),
//   ];
// };
