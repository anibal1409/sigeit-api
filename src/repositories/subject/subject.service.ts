import { Not, Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRepository } from '../../common/use-case';
import {
  CreateSubjectDto,
  GetSubjectDepartmentDto,
  UpdateSubjectDto,
} from './dto';
import { ResponseSubjectDto } from './dto/response-subject.dto';
import { Subject } from './entities';
import { assertSubjectWeeklyHours } from './subject-hours';
import { normalizeSubjectCode } from './subject-code';

/** Reparto semanal por defecto al crear: todo el total como teoría. */
function defaultWeeklySplit(
  weeklyHours: number,
  theoreticalHours?: number,
  practicalHours?: number,
): { theoreticalHours: number; practicalHours: number } {
  const practical = practicalHours ?? 0;
  const theoretical =
    theoreticalHours ?? weeklyHours - practical;
  return { theoreticalHours: theoretical, practicalHours: practical };
}

@Injectable()
export class SubjectService implements CrudRepository<Subject> {
  constructor(
    @InjectRepository(Subject)
    private repository: Repository<Subject>,
  ) {}

  async findValid(id: number): Promise<Subject> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: ['department', 'careers'],
    });
    if (!item) {
      throw new NotFoundException('Subject not found');
    }
    return item;
  }

  findByName(name: string, id?: number): Promise<Subject> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  findByCode(code: string, id?: number): Promise<Subject> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        code,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateSubjectDto): Promise<ResponseSubjectDto> {
    const code = normalizeSubjectCode(createDto.code);
    if (await this.findByCode(code)) {
      throw new BadRequestException('Code subject already exists.');
    }

    const split = defaultWeeklySplit(
      createDto.hours,
      createDto.theoreticalHours,
      createDto.practicalHours,
    );
    assertSubjectWeeklyHours(
      createDto.hours,
      split.theoreticalHours,
      split.practicalHours,
    );

    const item = await this.repository.save({
      ...createDto,
      code,
      theoreticalHours: split.theoreticalHours,
      practicalHours: split.practicalHours,
    });

    return await this.findOne(item.id);
  }

  findAll(data: GetSubjectDepartmentDto) {
    return this.repository.find({
      where: {
        deleted: false,
        status: data.status,
        department: {
          id: data.departmentId,
        },
        careers: {
          id: data.careerId,
        },
        semester: data.semester,
      },
      relations: ['department', 'careers'],
      order: {
        department: {
          id: 'ASC',
        },
        semester: 'ASC',
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ResponseSubjectDto> {
    const item = await this.findValid(id);
    return new ResponseSubjectDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateSubjectDto,
  ): Promise<ResponseSubjectDto> {
    const code = updateDto.code && normalizeSubjectCode(updateDto.code);
    if (await this.findByCode(code, id)) {
      throw new BadRequestException('Subject already exists.');
    }

    const current = await this.findValid(id);
    const weeklyHours = updateDto.hours ?? current.hours;
    const theoreticalHours =
      updateDto.theoreticalHours ?? current.theoreticalHours;
    const practicalHours = updateDto.practicalHours ?? current.practicalHours;
    assertSubjectWeeklyHours(weeklyHours, theoreticalHours, practicalHours);

    const item = await this.repository.save({
      id,
      name: updateDto.name,
      description: updateDto?.description,
      code,
      department: updateDto.department,
      semester: updateDto.semester,
      credits: updateDto.credits,
      hours: weeklyHours,
      theoreticalHours,
      practicalHours,
      typeCurriculum: updateDto.typeCurriculum,
      status: updateDto.status,
      careers: updateDto.careers,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseSubjectDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseSubjectDto(await this.repository.save(item));
  }
}
