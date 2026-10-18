import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { RequestWithUser } from '../../auth/roles/roles.guard';
import { User } from './entities';
import { Roles } from './enums/roles';

/** Usuario autenticado, ya cargado y validado (activo, no eliminado) por `RolesGuard`. */
export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): User =>
    ctx.switchToHttp().getRequest<RequestWithUser>().currentUser,
);

/**
 * Lanza 403 si un jefe de departamento actúa sobre otro departamento. Los
 * demás roles ya fueron filtrados por `@AllowRoles` en la ruta.
 */
export function assertDepartmentScope(user: User, departmentId: number): void {
  if (
    user.role === Roles.HeadDepartment &&
    user.department?.id !== departmentId
  ) {
    throw new ForbiddenException();
  }
}
