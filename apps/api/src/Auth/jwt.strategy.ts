import { AuthService } from './../service/auth.service';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(req: Request, payload: any) {
    const token = req.headers['authorization'].split('')[1];
    try {
      const validateToken = await this.authService.validateUser(token, payload);
      return validateToken;
    } catch (e) {
      throw new UnauthorizedException('not vaild user');
    }
  }
}
