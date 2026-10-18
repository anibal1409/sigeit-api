import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { Roles } from '../../repositories/user/enums/roles';

/** Clave de metadatos con los roles permitidos de una ruta. */
export const ROLES_KEY = 'roles';

/** Cualquier rol autenticado (p. ej. cambiar la propia contraseña). */
export const ANY_ROLE: Roles[] = Object.values(Roles);

/** Roles que planifican: secciones, horarios, reportes y estadísticas. */
export const PLANNING_ROLES: Roles[] = [
  Roles.Administrator,
  Roles.Director,
  Roles.HeadDepartment,
  Roles.Planner,
];

/** Roles que gestionan profesores y sus récords académicos. */
export const TEACHER_ADMIN_ROLES: Roles[] = [
  Roles.Administrator,
  Roles.Director,
  Roles.HeadDepartment,
];

/**
 * Roles que pueden usar la ruta (o todas las del controlador). Sin este
 * decorador, `RolesGuard` permite lecturas a cualquier usuario autenticado y
 * deja las escrituras solo al Administrador.
 */
export const AllowRoles = (...roles: Roles[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles);
