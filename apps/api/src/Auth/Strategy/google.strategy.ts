import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class googleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: 'bous1651',
      clientSecret: 'showme',
      callbackURL: 'www.naver.com',
      scope: ['email', 'profile'],
    });
  }
  async validate(accesstoken, refreshtoken, profile) {}
}
