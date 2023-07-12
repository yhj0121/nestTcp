import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum LoginType {
  KAKAO = 0,
  FACEBOOK = 1,
  NAVER = 2,
}

registerEnumType(LoginType, {
  name: 'LoginTypes',
});

@ObjectType()
export class Info {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;

  @Field(() => String)
  userInfo: string;

  @Field(() => String)
  userDetail: string;

  @Field(() => LoginType)
  LoginType: LoginType;

  @Field(() => String)
  ipAddress: string;
}
