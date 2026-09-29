import { DeepPartial, Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PeriodService } from '../period/period.service';
import { Subject } from '../subject/entities';
import { normalizeSubjectCode } from '../subject/subject-code';
import { SubjectService } from '../subject/subject.service';
import {
  GetSubjectDemandDto,
  ImportSubjectDemandResultDto,
  ResponseSubjectDemandDto,
} from './dto';
import { SubjectDemand } from './entities';
import {
  DemandRow,
  parseDemandFile,
  UploadedDemandFile,
} from './subject-demand.parser';

@Injectable()
export class SubjectDemandService {
  constructor(
    @InjectRepository(SubjectDemand)
    private readonly repository: Repository<SubjectDemand>,
    private readonly periodService: PeriodService,
    private readonly subjectService: SubjectService,
  ) {}

  /**
   * Reemplaza la demanda del período con el contenido del archivo.
   * Los códigos de ambos lados se comparan en formato canónico (ver
   * `normalizeSubjectCode`). Los que no existen como asignatura se omiten y se
   * reportan; si ninguno existe se rechaza para no borrar la demanda previa.
   */
  async import(
    periodId: number,
    file: UploadedDemandFile,
  ): Promise<ImportSubjectDemandResultDto> {
    await this.periodService.findValid(periodId);
    const { rows, invalidRows } = await parseDemandFile(file);
    if (!rows.length) {
      throw new BadRequestException('El archivo no contiene filas válidas.');
    }

    const subjects = await this.subjectService.findAll({});
    const subjectByCode = new Map(
      subjects.map((s) => [normalizeSubjectCode(s.code), s]),
    );
    const codes = [...new Set(rows.map((row) => row.code))];
    const unknownCodes = codes.filter((code) => !subjectByCode.has(code));
    if (unknownCodes.length === codes.length) {
      throw new BadRequestException(
        'Ninguna asignatura del archivo existe en el sistema.',
      );
    }

    const entities = this.toEntities(periodId, rows, subjectByCode);
    await this.repository.manager.transaction(async (manager) => {
      await manager.delete(SubjectDemand, { period: { id: periodId } });
      await manager.save(SubjectDemand, entities);
    });

    return { imported: entities.length, unknownCodes, invalidRows };
  }

  /** Demanda del período, opcionalmente filtrada por departamento. */
  async findAllPeriod(
    periodId: number,
    query: GetSubjectDemandDto,
  ): Promise<ResponseSubjectDemandDto[]> {
    const items = await this.repository.find({
      where: {
        deleted: false,
        period: { id: periodId },
        subject: { department: { id: query.departmentId } },
      },
      relations: ['subject'],
      order: { subject: { code: 'ASC' }, level: 'ASC' },
    });
    return items.map((item) => new ResponseSubjectDemandDto(item));
  }

  /** Convierte filas en entidades; suma cantidades repetidas de asignatura + nivel. */
  private toEntities(
    periodId: number,
    rows: DemandRow[],
    subjectByCode: Map<string, Subject>,
  ): DeepPartial<SubjectDemand>[] {
    const merged = new Map<string, DeepPartial<SubjectDemand>>();
    for (const row of rows) {
      const subject = subjectByCode.get(row.code);
      if (!subject) continue;
      const key = `${subject.id}-${row.level}`;
      const current = merged.get(key);
      if (current) {
        current.quantity += row.quantity;
        continue;
      }
      merged.set(key, {
        period: { id: periodId },
        subject: { id: subject.id },
        level: row.level,
        quantity: row.quantity,
      });
    }
    return [...merged.values()];
  }
}
