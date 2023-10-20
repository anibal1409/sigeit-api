export enum Roles {
  Administrator = 'admin',
  Director = 'director',
  HeadDepartment = 'head-department',
  Planner = 'planner',
  Teacher = 'teacher',
  Student = 'student',
}

export const ROLES_LIST = {
  [Roles.Administrator]: 'Administrador',
  [Roles.Director]: 'Director',
  [Roles.HeadDepartment]: 'Jefe de departamento',
  [Roles.Planner]: 'Planificador',
  [Roles.Teacher]: 'Profesor',
  [Roles.Student]: 'Estudiante',
};
