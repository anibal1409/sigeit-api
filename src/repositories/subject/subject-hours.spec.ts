import { BadRequestException } from '@nestjs/common';

import { SubjectInstructionType } from './enum';
import {
  assertSubjectWeeklyHours,
  resolveSubjectInstructionType,
} from './subject-hours';

describe('resolveSubjectInstructionType', () => {
  it('returns TEORICA when only theory', () => {
    expect(resolveSubjectInstructionType(3, 0)).toBe(
      SubjectInstructionType.Theoretical,
    );
  });

  it('returns PRACTICA when only practice', () => {
    expect(resolveSubjectInstructionType(0, 2)).toBe(
      SubjectInstructionType.Practical,
    );
  });

  it('returns TEORICA_PRACTICA when both', () => {
    expect(resolveSubjectInstructionType(2, 2)).toBe(
      SubjectInstructionType.TheoreticalPractical,
    );
  });
});

describe('assertSubjectWeeklyHours', () => {
  it('accepts a valid split', () => {
    expect(() => assertSubjectWeeklyHours(4, 3, 1)).not.toThrow();
  });

  it('rejects mismatched totals', () => {
    expect(() => assertSubjectWeeklyHours(4, 2, 1)).toThrow(BadRequestException);
  });

  it('rejects weekly hours without split', () => {
    expect(() => assertSubjectWeeklyHours(3, 0, 0)).toThrow(BadRequestException);
  });
});
