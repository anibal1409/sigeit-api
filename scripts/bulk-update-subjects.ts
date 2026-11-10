/**
 * Actualiza asignaturas existentes desde TSV (solo UPDATE, sin INSERT).
 * Uso: npx ts-node -r tsconfig-paths/register scripts/bulk-update-subjects.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { Client } from 'pg';

import { normalizeSubjectCode } from '../src/repositories/subject/subject-code';

const TSV_PATH = path.join(__dirname, '.update-subjects-bulk.tsv');

const DEPARTMENT_ALIASES: Record<string, string> = {
  'Socio-Humanístico': 'Humanidades',
  'Humanidades y Ciencias Sociales': 'Humanidades',
};

function parseTsvLine(line: string): string[] {
  return line.split('\t');
}

function parseNumber(value: string): number | undefined {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }
  return Number.parseInt(trimmed, 10);
}

async function main(): Promise<void> {
  const password = process.env.TYPEORM_PASSWORD;
  if (!password) {
    throw new Error('TYPEORM_PASSWORD is required');
  }
  const client = new Client({
    host: process.env.TYPEORM_HOST ?? 'localhost',
    port: Number(process.env.TYPEORM_PORT ?? 5432),
    user: process.env.TYPEORM_USERNAME ?? 'postgres',
    password,
    database: process.env.TYPEORM_DATABASE ?? 'sigeit',
  });
  await client.connect();

  const raw = fs.readFileSync(TSV_PATH, 'utf8').trim();
  const lines = raw.split('\n').slice(1);

  const departments = await client.query<{ id: number; name: string }>(
    'SELECT id, name FROM department WHERE deleted IS NOT TRUE',
  );
  const deptByName = new Map<string, number>(
    departments.rows.map((row) => [row.name, Number(row.id)]),
  );

  const careers = await client.query<{ id: number; name: string }>(
    'SELECT id, name FROM career WHERE deleted IS NOT TRUE',
  );
  const careerByName = new Map<string, number>(
    careers.rows.map((row) => [row.name, Number(row.id)]),
  );

  const updated: string[] = [];
  const skippedMissing: string[] = [];
  const errors: string[] = [];

  await client.query('BEGIN');

  try {
    for (const line of lines) {
      const parts = parseTsvLine(line);
      if (parts.length < 13) {
        errors.push(`${parts[0] ?? line}: expected 13 columns, got ${parts.length}`);
        continue;
      }
      const [
        codeRaw,
        name,
        departmentRaw,
        careersRaw,
        creditsRaw,
        semesterRaw,
        hoursRaw,
        theoryRaw,
        practiceRaw,
        typeCurriculumRaw,
        description,
        ,
        statusRaw,
      ] = parts;

      const code = normalizeSubjectCode(codeRaw);
      const existing = await client.query<{ id: number }>(
        'SELECT id FROM subject WHERE code = $1 AND deleted IS NOT TRUE',
        [code],
      );
      if (existing.rowCount === 0) {
        skippedMissing.push(codeRaw);
        continue;
      }

      const subjectId = existing.rows[0].id;
      const credits = parseNumber(creditsRaw);
      const semester = parseNumber(semesterRaw);
      const hours = parseNumber(hoursRaw);
      const theoreticalHours = parseNumber(theoryRaw);
      const practicalHours = parseNumber(practiceRaw);
      const typeCurriculum = parseNumber(typeCurriculumRaw);

      if (
        hours === undefined ||
        theoreticalHours === undefined ||
        practicalHours === undefined ||
        credits === undefined
      ) {
        errors.push(`${codeRaw}: invalid numeric fields`);
        continue;
      }
      if (theoreticalHours + practicalHours !== hours) {
        errors.push(
          `${codeRaw}: theory+practice (${theoreticalHours + practicalHours}) != hours (${hours})`,
        );
        continue;
      }

      const departmentName =
        DEPARTMENT_ALIASES[departmentRaw.trim()] ?? departmentRaw.trim();
      const departmentId = deptByName.get(departmentName);
      if (!departmentId) {
        errors.push(`${codeRaw}: unknown department "${departmentRaw}"`);
        continue;
      }

      const status = statusRaw.trim().toLowerCase() !== 'false';

      await client.query(
        `UPDATE subject SET
          name = $2,
          credits = $3,
          hours = $4,
          "theoreticalHours" = $5,
          "practicalHours" = $6,
          description = $7,
          "departmentId" = $8,
          status = $9,
          semester = COALESCE($10, semester),
          "typeCurriculum" = COALESCE($11, "typeCurriculum"),
          "updatedAt" = NOW()
        WHERE id = $1`,
        [
          subjectId,
          name.trim(),
          credits,
          hours,
          theoreticalHours,
          practicalHours,
          description?.trim() || null,
          departmentId,
          status,
          semester ?? null,
          typeCurriculum ?? null,
        ],
      );

      const careerNames = careersRaw.split(';').map((c) => c.trim());
      const careerIds: number[] = [];
      for (const careerName of careerNames) {
        const careerId = careerByName.get(careerName);
        if (!careerId) {
          errors.push(`${codeRaw}: unknown career "${careerName}"`);
          careerIds.length = 0;
          break;
        }
        careerIds.push(careerId);
      }
      if (careerIds.length === careerNames.length && careerIds.length > 0) {
        await client.query(
          'DELETE FROM subject_careers_career WHERE "subjectId" = $1',
          [subjectId],
        );
        for (const careerId of careerIds) {
          await client.query(
            'INSERT INTO subject_careers_career ("subjectId", "careerId") VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [subjectId, careerId],
          );
        }
      }

      updated.push(code);
    }

    if (errors.length > 0) {
      await client.query('ROLLBACK');
      console.error('ERRORS — rolled back:\n' + errors.join('\n'));
      process.exit(1);
    }

    await client.query('COMMIT');
    console.log(`Updated: ${updated.length}`);
    console.log(updated.join(', '));
    console.log(`Skipped (not in DB): ${skippedMissing.length}`);
    if (skippedMissing.length > 0) {
      console.log(skippedMissing.join(', '));
    }
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
