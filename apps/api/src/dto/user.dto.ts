import { ArgsType, Field, HideField, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class userDto {
  @Field() userId: string;

  @HideField() password: string;

  @Field() email: string;

  @Field() address: string;
}

@ArgsType()
export class userIdInput {
  @Field({ nullable: true }) userId: string;
}

@ArgsType()
export class signupInput {
  @Field() userId: string;
  @Field() password: string;
  @Field() email: string;
  @Field() address: string;
}
