import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { MailModule } from '../mail/mail.module';
import { UserModule } from '../repositories/user/user.module';
import { AuthController } from './auth.controller';
import { ChangePasswordService } from './change-password';
import { JWT_CONST, JwtAuthGuard } from './jwt-auth';
import { RolesGuard } from './roles/roles.guard';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout';
import { RecoveryPasswordService } from './recovery-password';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    forwardRef(() => UserModule),
    // Async para leer JWT_SECRET cuando ConfigModule ya cargó el .env.
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: JWT_CONST.secret,
        signOptions: { expiresIn: JWT_CONST.expiresIn },
      }),
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    LoginService,
    JwtAuthService,
    // El orden importa: primero se valida el JWT y después el rol.
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    ChangePasswordService,
    LogoutService,
    RecoveryPasswordService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [],
})
export class AuthModule {}
