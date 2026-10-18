import { Request } from 'express';
import { Repository } from 'typeorm';

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../repositories/user/entities';
import { Roles } from '../../repositories/user/enums/roles';
import { IS_PUBLIC_KEY } from '../login';
import { ANY_ROLE, ROLES_KEY } from './roles.decorator';

/** Métodos HTTP que no modifican datos. */
const READ_METHODS = ['GET', 'HEAD', 'OPTIONS'];

/** Petición con el usuario cargado por `RolesGuard`. */
export type RequestWithUser = Request & { currentUser?: User };

/**
 * Guard global de roles; corre después de `JwtAuthGuard`.
 * - Rutas `@Public()`: sin comprobación.
 * - Carga el usuario del JWT una sola vez y lo deja en `request.currentUser`.
 * - Rechaza usuarios eliminados o inactivos aunque su token siga vigente.
 * - Con `@AllowRoles(...)`: solo esos roles. Sin él: lecturas para cualquier
 *   rol y escrituras solo para el Administrador (denegar por defecto).
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const targets = [context.getHandler(), context.getClass()];
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, targets)) {
      return true;
    }
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const userId = +(request.user as { userId?: string })?.userId;
    const user = userId
      ? await this.userRepository.findOne({
          where: { id: userId, deleted: false },
          relations: ['department'],
        })
      : null;
    if (!user || user.status === false) {
      throw new ForbiddenException('Inactive or deleted user.');
    }
    request.currentUser = user;

    const allowed =
      this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, targets) ??
      (READ_METHODS.includes(request.method)
        ? ANY_ROLE
        : [Roles.Administrator]);
    if (!allowed.includes(user.role as Roles)) {
      throw new ForbiddenException();
    }
    return true;
  }
}
