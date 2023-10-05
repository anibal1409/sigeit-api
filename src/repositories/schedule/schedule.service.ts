// eslint-disable-next-line prettier/prettier
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
  CreateScheduleDto,
  GetSchedulesDto,
  ResponseScheduleDto,
  UpdateScheduleDto,
} from './dto';
import { Schedule } from './entities';

@Injectable()
export class ScheduleService implements CrudRepository<Schedule> {

  constructor(
    @InjectRepository(Schedule)
    private repository: Repository<Schedule>,
  ) { }

  async findValid(id: number): Promise<Schedule> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: ['day', 'period', 'classroom', 'section', 'section.subject'],
    });
    if (!item) {
      throw new NotFoundException('Schedule not found');
    }
    return item;
  }

  findBySchedule(
    start: string,
    end: string,
    classroomId: number,
    sectionId: number,
    dayId: number,
    periodId: number,
    id?: number,
  ): Promise<Schedule> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        period: {
          id: periodId,
        },
        day: {
          id: dayId,
        },
        classroom: {
          id: classroomId,
        },
        section: {
          id: sectionId,
        },
        start,
        end,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateScheduleDto): Promise<ResponseScheduleDto> {
    if (
      await this.findBySchedule(
        createDto.start,
        createDto.end,
        createDto.classroom.id,
        createDto.section.id,
        createDto.day.id,
        createDto.period.id,
      )
    ) {
      throw new BadRequestException('Schedule already exists.');
    }

    const item = await this.repository.save(createDto);
    return await this.findOne(item.id);
  }

  findAllPeriod(periodId: number, query?: GetSchedulesDto) {
    return this.repository.find({
      where: {
        deleted: false,
        period: {
          id: periodId,
        },
        section: {
          id: query?.sectionId || Not(0),
        },
        classroom: {
          id: query?.classroomId || Not(0),
        },
        day: {
          id: query?.dayId || Not(0),
        },
      },
      relations: [
        'classroom',
        'day',
        'period',
        'section',
        'section.subject',
        'section.teacher',
      ],
      order: {
        day: {
          id: 'ASC',
        },
        start: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ResponseScheduleDto> {
    const item = await this.findValid(id);
    return new ResponseScheduleDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateScheduleDto,
  ): Promise<ResponseScheduleDto> {
    if (
      await this.findBySchedule(
        updateDto.start,
        updateDto.end,
        updateDto.classroom.id,
        updateDto.section.id,
        updateDto.day.id,
        updateDto.period.id,
        id,
      )
    ) {
      throw new BadRequestException('Schedule already exists.');
    }
    const item = await this.repository.save({
      id,
      status: updateDto.status,
      period: updateDto.period,
      start: updateDto.start,
      end: updateDto.end,
      classroom: updateDto.classroom,
      section: updateDto.section,
      day: updateDto.day,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseScheduleDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseScheduleDto(await this.repository.save(item));
  }
}
