import {
  Not,
  Repository,
} from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRepository } from '../../common';
import {
  CreateSectionDto,
  GetSectionsDto,
  ResponseSectionDto,
  UpdateSectionDto,
} from './dto';
import { Section } from './entities';

@Injectable()
export class SectionService implements CrudRepository<Section> {

  constructor(
    @InjectRepository(Section)
    private repository: Repository<Section>,
  ) { }

  async findValid(id: number): Promise<Section> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: ['teacher', 'period', 'subject'],
    });
    if (!item) {
      throw new NotFoundException('Section not found');
    }
    return item;
  }

  findByName(
    name: string,
    subjectId: number,
    periodId: number,
    id?: number,
  ): Promise<Section> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        subject: {
          id: subjectId,
        },
        period: {
          id: periodId,
        },
        deleted: false,
      },
    });
  }

  async create(createDto: CreateSectionDto): Promise<ResponseSectionDto> {
    if (
      await this.findByName(
        createDto.name,
        createDto.subject.id,
        createDto.period.id,
      )
    ) {
      throw new BadRequestException('Section already exists.');
    }

    const item = await this.repository.save(createDto);
    return await this.findOne(item.id);
  }

  findAllOfPeriod(periodId: number, query?: GetSectionsDto) {
    return this.repository.find({
      where: {
        deleted: false,
        status: query?.status,
        period: {
          id: periodId,
        },
        subject: {
          id: query?.subjectId || Not(0),
          department: {
            id: query?.departmentId || Not(0),
          },
          semester: query?.semester || Not(0),
        },
        teacher: {
          id: query?.teacherId || Not(0),
        },
      },
      relations: ['subject', 'period', 'teacher'],
      order: {
        subject: {
          semester: 'ASC',
          name: 'ASC',
        },
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ResponseSectionDto> {
    const item = await this.findValid(id);
    return new ResponseSectionDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateSectionDto,
  ): Promise<ResponseSectionDto> {
    if (
      await this.findByName(
        updateDto.name,
        updateDto.subject.id,
        updateDto.period.id,
        id,
      )
    ) {
      throw new BadRequestException('Section already exists.');
    }
    const item = await this.repository.save({
      id,
      name: updateDto.name,
      status: updateDto.status,
      capacity: updateDto.capacity,
      subject: updateDto.subject,
      period: updateDto.period,
      teacher: updateDto.teacher,
      all: updateDto?.all,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseSectionDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseSectionDto(await this.repository.save(item));
  }
}
