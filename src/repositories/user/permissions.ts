import { Request } from 'express';

import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { User } from './entities';
import { Roles } from './enums/roles';

/** Id del usuario autenticado, tomado del JWT validado (`req.user.userId`). */
export const CurrentUserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): number => {
    const user = ctx.switchToHttp().getRequest<Request>().user as {
      userId: string;
    };
    return +user?.userId;
  },
);

/** Lanza 403 si el usuario no es Administrador. */
export function assertAdmin(user: User): void {
  if (user?.role !== Roles.Administrator) {
    throw new ForbiddenException();
  }
}

/** Lanza 403 salvo que sea Administrador o jefe de ese departamento. */
export function assertCanManageDepartment(
  user: User,
  departmentId: number,
): void {
  const isHead =
    user?.role === Roles.HeadDepartment && user.department?.id === departmentId;
  if (user?.role !== Roles.Administrator && !isHead) {
    throw new ForbiddenException();
  }
}
