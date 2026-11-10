import { BadRequestException } from '@nestjs/common';

import { SubjectInstructionType } from './enum';

/** Determina la modalidad a partir del reparto horario semanal. */
export function resolveSubjectInstructionType(
  theoreticalHours: number,
  practicalHours: number,
): SubjectInstructionType {
  if (theoreticalHours > 0 && practicalHours > 0) {
    return SubjectInstructionType.TheoreticalPractical;
  }
  if (practicalHours > 0) {
    return SubjectInstructionType.Practical;
  }
  return SubjectInstructionType.Theoretical;
}

/** Exige que el total semanal coincida con teoría + práctica y que no haya valores negativos. */
export function assertSubjectWeeklyHours(
  weeklyHours: number,
  theoreticalHours: number,
  practicalHours: number,
): void {
  if (weeklyHours < 0 || theoreticalHours < 0 || practicalHours < 0) {
    throw new BadRequestException('Subject hours cannot be negative');
  }
  if (theoreticalHours + practicalHours !== weeklyHours) {
    throw new BadRequestException(
      'Theoretical and practical hours must sum to weekly hours',
    );
  }
  if (weeklyHours > 0 && theoreticalHours === 0 && practicalHours === 0) {
    throw new BadRequestException(
      'Weekly hours require a theoretical and/or practical split',
    );
  }
}
