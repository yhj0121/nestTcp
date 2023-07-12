import { userDto } from './../dto/user.dto';
import { User } from './../../../../libs/persistence/src/entities/user.entity';
import { AuthService } from './../service/auth.service';
import { Logger, ExecutionContext, Query } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);
  constructor(private authservice: AuthService) {}

  // @Mutation(() => userDto, { nullable: false, name: 'login' })
  // async login(@Context() context: ExecutionContext, @Args() loginINput) {
  //   try {
  //     const req = context['req'];
  //     const header = req.header;
  //     const socket = req.soekct;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
  @Mutation(() => String)
  async testMutation() {
    return 'mutation test';
  }

  // @Query(() => userDto, { nullable: true, name: 'signup' })
  // async signup(@Args singupInput) {}
}
