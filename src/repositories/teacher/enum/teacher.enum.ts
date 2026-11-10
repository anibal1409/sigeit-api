/** Categoría del escalafón docente; cada una corresponde a un nivel (I–V). */
export enum TeacherCategory {
  Instructor = 'INSTRUCTOR',
  Assistant = 'ASSISTANT',
  Aggregate = 'AGGREGATE',
  Associate = 'ASSOCIATE',
  Full = 'FULL',
}

/** Nivel del escalafón asociado a cada categoría. */
export const TEACHER_CATEGORY_LEVEL: Record<TeacherCategory, string> = {
  [TeacherCategory.Instructor]: 'I',
  [TeacherCategory.Assistant]: 'II',
  [TeacherCategory.Aggregate]: 'III',
  [TeacherCategory.Associate]: 'IV',
  [TeacherCategory.Full]: 'V',
};

/** Condición laboral del profesor. */
export enum EmploymentStatus {
  Contracted = 'CONTRACTED',
  Permanent = 'PERMANENT',
}

/** Dedicación horaria del profesor (valores persistidos en mayúsculas). */
export enum TeacherDedication {
  Exclusive = 'EXCLUSIVA',
  FullTime = 'TIEMPO_COMPLETO',
  HalfTime = 'MEDIO_TIEMPO',
}

/** Estado del proceso de evaluación para contratar al profesor. */
export enum HiringEvaluationStatus {
  InEvaluation = 'IN_EVALUATION',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
}

/** Resultado de una asignatura cursada, deducido de la nota o del resultado escrito. */
export enum GradeStatus {
  Approved = 'APPROVED',
  Failed = 'FAILED',
  Withdrawn = 'WITHDRAWN',
  InProgress = 'IN_PROGRESS',
}

/** Nivel académico de un título. */
export enum DegreeLevel {
  Undergraduate = 'UNDERGRADUATE',
  Specialization = 'SPECIALIZATION',
  Master = 'MASTER',
  Doctorate = 'DOCTORATE',
  Other = 'OTHER',
}
