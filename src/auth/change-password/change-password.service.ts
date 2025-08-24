import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UserService } from '../../repositories/user/user.service';
import { JwtAuthService } from '../jwt-auth';
import { ChangePasswordResponseDto } from './dto';

@Injectable()
export class ChangePasswordService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}
  async changePassword(
    token_: string,
    newPassword_: string,
  ): Promise<ChangePasswordResponseDto> {
    const { username: email, sub: id } =
      await this.jwtAuthService.decode(token_);

    const response = await this.userService.changePassword(
      email,
      id,
      newPassword_,
    );

    if (response) {
      return { message: 'Contraseña cambiada.' };
    } else {
      return { message: 'Error al cambiar la contraseña.' };
    }
  }
}
