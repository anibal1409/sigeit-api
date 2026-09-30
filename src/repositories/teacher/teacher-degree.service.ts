import { DeepPartial, In, Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { normalizeText } from '../../common/text';
import { UploadedFileData } from '../../common/upload';
import { Subject } from '../subject/entities';
import { normalizeSubjectCode } from '../subject/subject-code';
import {
  CreateTeacherDegreeDto,
  ResponseTeacherDegreeDto,
  ResponseTeacherDto,
  ResponseTeacherGradeSearchDto,
  SearchTeacherGradeDto,
  TeacherGradeDto,
  toSubjectRef,
  TranscriptPreviewDto,
  UpdateTeacherDegreeDto,
} from './dto';
import { TeacherDegree, TeacherGrade } from './entities';
import { byPercentDesc, toGradeMatch } from './grade-match';
import { TeacherService } from './teacher.service';
import { readTranscriptWithAi } from './transcript-ai.reader';
import { extractPdfText, parseTranscriptText } from './transcript.parser';

/** Tipos de archivo admitidos para los récords de notas, por extensión. */
const TRANSCRIPT_MIME_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  heic: 'image/heic',
};

/** Nombre de la asignatura del pensum en el formato de `normalizedName`, en SQL. */
const SUBJECT_NAME_SQL =
  "translate(lower(subject.name), 'áéíóúüñÁÉÍÓÚÜÑ', 'aeiouunaeiouun')";

/** Relaciones para devolver un título con sus notas y equivalencias. */
const DEGREE_RELATIONS = ['grades', 'grades.subject'];

/** Títulos de los profesores, sus notas y la búsqueda de profesores por nota. */
@Injectable()
export class TeacherDegreeService {
  constructor(
    @InjectRepository(TeacherDegree)
    private readonly repository: Repository<TeacherDegree>,
    @InjectRepository(TeacherGrade)
    private readonly gradeRepository: Repository<TeacherGrade>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    private readonly teacherService: TeacherService,
  ) {}

  /** Títulos vigentes del profesor con sus notas. */
  async findAllTeacher(teacherId: number): Promise<ResponseTeacherDegreeDto[]> {
    const items = await this.repository.find({
      where: { deleted: false, teacher: { id: teacherId } },
      relations: DEGREE_RELATIONS,
      order: { graduationDate: 'DESC', grades: { period: 'ASC', code: 'ASC' } },
    });
    return items.map((item) => new ResponseTeacherDegreeDto(item));
  }

  /** Título vigente con sus notas; 404 si no existe o fue eliminado. */
  async findOne(id: number): Promise<ResponseTeacherDegreeDto> {
    return new ResponseTeacherDegreeDto(await this.findValid(id));
  }

  /** Registra un título con sus notas; valida el profesor y que las notas quepan en la escala. */
  async create(dto: CreateTeacherDegreeDto): Promise<ResponseTeacherDegreeDto> {
    await this.teacherService.findValid(dto.teacher.id);
    assertGradesInScale(dto.grades, dto.maxGrade);
    const item = await this.repository.save({
      ...dto,
      grades: dto.grades.map(toGradeEntity),
    });
    return this.findOne(item.id);
  }

  /** Actualiza el título; si trae `grades`, reemplaza todas sus notas. */
  async update(
    id: number,
    dto: UpdateTeacherDegreeDto,
  ): Promise<ResponseTeacherDegreeDto> {
    const current = await this.findValid(id);
    assertGradesInScale(
      dto.grades ?? current.grades,
      dto.maxGrade ?? current.maxGrade,
    );
    const { grades, level, title, institution, graduationDate, maxGrade } = dto;
    await this.repository.manager.transaction(async (manager) => {
      await manager.save(TeacherDegree, {
        id,
        level,
        title,
        institution,
        graduationDate,
        maxGrade,
      });
      if (!grades) return;
      await manager.delete(TeacherGrade, { degree: { id } });
      await manager.save(
        TeacherGrade,
        grades.map((grade) => ({ ...toGradeEntity(grade), degree: { id } })),
      );
    });
    return this.findOne(id);
  }

  /** Eliminación lógica del título; sus notas dejan de aparecer en las búsquedas. */
  async remove(id: number): Promise<ResponseTeacherDegreeDto> {
    const item = await this.findValid(id);
    await this.repository.update(id, { deleted: true });
    return new ResponseTeacherDegreeDto(item);
  }

  /**
   * Extrae las notas de un récord sin guardarlas (vista previa). Los PDF con
   * texto en formato UDO se interpretan localmente (gratis e inmediato); las
   * imágenes, los PDF escaneados y los formatos no reconocidos van a la IA.
   * Cada nota trae sugerida su asignatura equivalente del pensum.
   */
  async parseTranscript(file: UploadedFileData): Promise<TranscriptPreviewDto> {
    const extension = file.originalname.split('.').pop()?.toLowerCase();
    const mimeType = TRANSCRIPT_MIME_TYPES[extension];
    if (!mimeType) {
      throw new BadRequestException(
        'Formato no soportado: use PDF, JPG, PNG, WEBP o HEIC.',
      );
    }
    let preview: TranscriptPreviewDto;
    if (extension === 'pdf') {
      preview = parseTranscriptText(await extractPdfText(file.buffer));
    }
    if (!preview?.grades.length) {
      preview = await readTranscriptWithAi(file.buffer, mimeType);
    }
    return this.suggestEquivalences(preview);
  }

  /**
   * Profesores con notas en asignaturas cuyo nombre, o el de su asignatura
   * equivalente del pensum, contiene todas las palabras buscadas (sin
   * distinguir mayúsculas ni tildes), ordenados por mejor nota.
   * ponytail: coincidencia por subcadena; usar pg_trgm si se necesita tolerar
   * errores de escritura o abreviaturas ("Program." vs "Programación").
   */
  async searchByGrade(
    query: SearchTeacherGradeDto,
  ): Promise<ResponseTeacherGradeSearchDto[]> {
    const qb = this.gradeRepository
      .createQueryBuilder('grade')
      .innerJoinAndSelect('grade.degree', 'degree')
      .innerJoinAndSelect('degree.teacher', 'teacher')
      .leftJoinAndSelect('teacher.department', 'department')
      .leftJoinAndSelect('grade.subject', 'subject')
      .where('degree.deleted = false AND teacher.deleted = false');
    const words = normalizeText(query.subject).split(' ').filter(Boolean);
    if (words.length) {
      const allWordsIn = (column: string) =>
        words.map((_, i) => `${column} LIKE :w${i}`).join(' AND ');
      qb.andWhere(
        `((${allWordsIn('grade.normalizedName')}) OR (${allWordsIn(SUBJECT_NAME_SQL)}))`,
        Object.fromEntries(words.map((word, i) => [`w${i}`, `%${word}%`])),
      );
    }
    if (query.minPercent !== undefined) {
      qb.andWhere('grade.grade * 100 / degree.maxGrade >= :minPercent', {
        minPercent: query.minPercent,
      });
    }
    return groupByTeacher(await qb.getMany());
  }

  /**
   * Sugiere la asignatura equivalente del pensum de cada nota, en este orden:
   * mismo código, la equivalencia ya usada antes para ese nombre (así se
   * aprenden casos como "Programación I" → "Programación Orientada a Objetos")
   * o mismo nombre.
   */
  private async suggestEquivalences(
    preview: TranscriptPreviewDto,
  ): Promise<TranscriptPreviewDto> {
    const names = preview.grades.map((grade) =>
      normalizeText(grade.subjectName),
    );
    if (!names.length) return preview;
    const [subjects, previous] = await Promise.all([
      this.subjectRepository.find({
        where: { deleted: false },
        select: ['id', 'code', 'name'],
      }),
      this.gradeRepository.find({
        where: { normalizedName: In(names), subject: { deleted: false } },
        relations: ['subject'],
        order: { id: 'DESC' },
      }),
    ]);
    const byCode = new Map(subjects.map((item) => [item.code, item]));
    const byName = new Map(
      subjects.map((item) => [normalizeText(item.name), item]),
    );
    const used = new Map<string, Subject>();
    previous.forEach(
      (grade) =>
        used.has(grade.normalizedName) ||
        used.set(grade.normalizedName, grade.subject),
    );
    preview.grades.forEach((grade, i) => {
      const subject =
        (grade.code && byCode.get(normalizeSubjectCode(grade.code))) ||
        used.get(names[i]) ||
        byName.get(names[i]);
      grade.subject = toSubjectRef(subject);
    });
    return preview;
  }

  /** Título vigente con sus notas ordenadas; lanza 404 si no existe. */
  private async findValid(id: number): Promise<TeacherDegree> {
    const item = await this.repository.findOne({
      where: { id, deleted: false },
      relations: DEGREE_RELATIONS,
      order: { grades: { period: 'ASC', code: 'ASC' } },
    });
    if (!item) {
      throw new NotFoundException('Teacher degree not found');
    }
    return item;
  }
}

/** Entidad de nota con el nombre normalizado que usa la búsqueda y la equivalencia por id. */
function toGradeEntity(grade: TeacherGradeDto): DeepPartial<TeacherGrade> {
  return {
    ...grade,
    normalizedName: normalizeText(grade.subjectName),
    subject: grade.subject ? { id: grade.subject.id } : null,
  };
}

/** Rechaza (400) las notas que superan la nota máxima de la escala del título. */
function assertGradesInScale(
  grades: { grade?: number }[],
  maxGrade: number,
): void {
  if (grades.some((item) => item.grade > maxGrade)) {
    throw new BadRequestException(
      `Hay notas mayores que la nota máxima de la escala (${maxGrade}).`,
    );
  }
}

/** Agrupa las notas por profesor, ordenando notas y profesores por porcentaje. */
function groupByTeacher(
  grades: TeacherGrade[],
): ResponseTeacherGradeSearchDto[] {
  const byTeacher = new Map<number, ResponseTeacherGradeSearchDto>();
  for (const grade of grades) {
    const teacher = grade.degree.teacher;
    const entry = byTeacher.get(teacher.id) ?? {
      teacher: new ResponseTeacherDto(teacher),
      matches: [],
    };
    entry.matches.push(toGradeMatch(grade));
    byTeacher.set(teacher.id, entry);
  }
  const results = [...byTeacher.values()];
  results.forEach((entry) => entry.matches.sort(byPercentDesc));
  return results.sort((a, b) => byPercentDesc(a.matches[0], b.matches[0]));
}
