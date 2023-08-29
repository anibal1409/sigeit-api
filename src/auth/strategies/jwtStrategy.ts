import { Request } from 'express';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { JWT_CONST } from '../jwt-auth/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: JWT_CONST.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): null | string => {
          const data = request?.cookies['sigeit-cookie'];
          if (!data) {
            return null;
          }
          return data.token;
        },
      ]),
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
  }): Promise<{ userId: string; username: string }> {
    return { userId: payload.sub, username: payload.email };
  }
}