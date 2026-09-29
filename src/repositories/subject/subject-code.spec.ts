import { normalizeSubjectCode } from './subject-code';

describe('normalizeSubjectCode', () => {
  it.each([
    ['61822', '0061822'],
    ['0061822', '0061822'],
    ['071-5963', '0715963'],
    [' 071 5963 ', '0715963'],
    ['ECSA', 'ECSA'],
    ['0000PETROLEO', '0000PETROLEO'],
  ])('%p → %p', (input, expected) => {
    expect(normalizeSubjectCode(input)).toBe(expected);
  });
});
