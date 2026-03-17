/**
 * Tipo semántico de la operación registrada en auditoría.
 */
export enum AuditAction {
  Create = 'CREATE',
  Update = 'UPDATE',
  Delete = 'DELETE',
  Other = 'OTHER',
  /** Inicio de sesión */
  AuthLogin = 'AUTH_LOGIN',
  /** Cierre de sesión */
  AuthLogout = 'AUTH_LOGOUT',
  /** Solicitud de recuperación de contraseña (email) */
  AuthRecoveryRequest = 'AUTH_RECOVERY_REQUEST',
  /** Consulta de validez del enlace/token de recuperación */
  AuthRecoveryValidate = 'AUTH_RECOVERY_VALIDATE',
  /** Contraseña restablecida vía token de recuperación */
  AuthRecoveryComplete = 'AUTH_RECOVERY_COMPLETE',
  /** Cambio de contraseña estando autenticado */
  AuthChangePassword = 'AUTH_CHANGE_PASSWORD',
  /** Registro público de estudiante */
  AuthRegisterPublic = 'AUTH_REGISTER_PUBLIC',
  /** Otra operación bajo /auth */
  AuthOther = 'AUTH_OTHER',
}
