import { Response } from 'express';

import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../repositories';
import {
  JWT_CONST,
  JwtAuthService,
} from '../jwt-auth';
import { comparePassword } from '../password-hasher';
import {
  LoginUserResponseDto,
  UserLoginDto,
} from './dto';

@Injectable()
export class LoginService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly jwtAuthService: JwtAuthService,
  ) { }

  async login(
    user: UserLoginDto,
    res: Response,
  ): Promise<LoginUserResponseDto> {
    const payload = { username: user.email, sub: user.id };

    const _token = await this.jwtService.signAsync(payload, {
      secret: JWT_CONST.secret,
      expiresIn: JWT_CONST.expiresIn,
    });
    const secretData = {
      token: _token,
    };

    const { email, id, role, name } = await this.userService.findOneByEmail(
      user.email,
    );

    const _expiredTime = parseInt(
      (await this.jwtAuthService.decode(_token)).exp + '000',
    );

    res.cookie('auth-cookie', secretData, { httpOnly: true });

    return {
      email,
      id,
      role,
      name,
      loginStamp: _expiredTime,
    };
  }

  async validateUser(email_: string, password_: string): Promise<UserLoginDto> {
    const user = await this.userService.findOneByEmail(email_);

    if (!user || !(await comparePassword(password_, user.password))) {
      throw new UnauthorizedException('Usuario o contraseña inválida.');
    }

    return { email: user.email, id: user.id };
  }
}


