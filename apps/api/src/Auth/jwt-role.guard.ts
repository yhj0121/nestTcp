// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { UserRole } from 'src/dtos/user.dto';

// export const ROLES_KEY = 'roles';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const gqlContext = GqlExecutionContext.create(context);
//     const token = gqlContext.getContext().req.headers?.authorization?.split(' ')[1];
//     // console.log(token);
//     // using this token, user information should be reed from redis. redis has user information including role

//     return false;
//     // return requiredRoles.some((role) => user.roles?.includes(role));
//   }
// }
