import { Not, Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRepository } from '../../common/use-case';
import { Section } from '../section/entities';
import {
  CreateTeacherDto,
  GetTeachersDto,
  ResponseSubjectHistoryDto,
  UpdateTeacherDto,
} from './dto';
import { ResponseTeacherDto } from './dto/response-teacher.dto';
import { Teacher } from './entities';

@Injectable()
export class TeacherService implements CrudRepository<Teacher> {
  constructor(
    @InjectRepository(Teacher)
    private repository: Repository<Teacher>,
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
  ) {}

  async findValid(id: number): Promise<Teacher> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: ['department'],
    });
    if (!item) {
      throw new NotFoundException('Teacher not found');
    }
    return item;
  }

  findByIdDocument(idDocument: string, id?: number): Promise<Teacher> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        idDocument,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateTeacherDto): Promise<ResponseTeacherDto> {
    if (await this.findByIdDocument(createDto.idDocument)) {
      throw new BadRequestException('Teacher already exists.');
    }

    const item = await this.repository.save(createDto);

    return await this.findOne(item.id);
  }

  findAll(data: GetTeachersDto) {
    return this.repository.find({
      where: {
        deleted: false,
        department: {
          id: data?.departmentId || Not(0),
          school: {
            id: data?.schoolId || Not(0),
          },
        },
        status: data?.status,
        category: data?.category,
        employmentStatus: data?.employmentStatus,
        hiringEvaluationStatus: data?.hiringEvaluationStatus,
      },
      order: {
        lastName: 'ASC',
      },
      relations: ['department'],
    });
  }

  findAllDepartment(id: number) {
    return this.repository.find({
      where: {
        deleted: false,
        department: {
          id,
        },
      },
      order: {
        lastName: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ResponseTeacherDto> {
    const item = await this.findValid(id);
    return new ResponseTeacherDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateTeacherDto,
  ): Promise<ResponseTeacherDto> {
    const duplicated =
      updateDto.idDocument &&
      (await this.findByIdDocument(updateDto.idDocument, id));
    if (duplicated) {
      throw new BadRequestException('Teacher already exists.');
    }

    const item = await this.repository.save({
      id,
      idDocument: updateDto.idDocument,
      firstName: updateDto.firstName,
      lastName: updateDto.lastName,
      status: updateDto.status,
      email: updateDto.email,
      department: updateDto.department,
      category: updateDto.category,
      employmentStatus: updateDto.employmentStatus,
      dedication: updateDto.dedication,
      hiringEvaluationStatus: updateDto.hiringEvaluationStatus,
      hiringEvaluationDate: updateDto.hiringEvaluationDate,
      hiringEvaluationNotes: updateDto.hiringEvaluationNotes,
    });

    return this.findOne(item.id);
  }

  /** Secciones que el profesor ha impartido, del período más reciente al más antiguo. */
  async findSubjectsHistory(id: number): Promise<ResponseSubjectHistoryDto[]> {
    await this.findValid(id);
    const sections = await this.sectionRepository.find({
      where: { deleted: false, teacher: { id } },
      relations: ['subject', 'period'],
      order: { period: { start: 'DESC' }, subject: { name: 'ASC' } },
    });
    return sections.map((section) => new ResponseSubjectHistoryDto(section));
  }

  async remove(id: number): Promise<ResponseTeacherDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseTeacherDto(await this.repository.save(item));
  }
}
