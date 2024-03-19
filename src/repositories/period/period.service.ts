import {
  In,
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
  ScheduleService,
} from '../schedule';
import { SectionService } from '../section';
import {
  CreatePeriodDto,
  ResponsePeriodDto,
  UpdatePeriodDto,
} from './dto';
import { Period } from './entities';
import { StagePeriod } from './enum';

@Injectable()
export class PeriodService implements CrudRepository<Period> {
  constructor(
    @InjectRepository(Period)
    private repository: Repository<Period>,
    private readonly scheduleService: ScheduleService,
    private readonly sectionService: SectionService,
  ) {}

  async findValid(id: number): Promise<Period> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: [],
    });
    if (!item) {
      throw new NotFoundException('Period not found');
    }
    return item;
  }

  findByName(name: string, id?: number): Promise<Period> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  async findByStage(
    stages: Array<StagePeriod>,
    status = true,
  ): Promise<Period> {
    const item = await this.repository.findOne({
      where: {
        deleted: false,
        status,
        stage: In(stages),
      },
      relations: [],
    });

    return item;
  }

  async findPeriodActive() {
    const item = await this.findByStage([
      StagePeriod.Planned,
      StagePeriod.toPlan,
    ]);

    if (!item) {
      throw new NotFoundException('Period not found');
    }

    return item;
  }

  async create(createDto: CreatePeriodDto): Promise<ResponsePeriodDto> {
    if (await this.findByName(createDto.name)) {
      throw new BadRequestException('Period already exists.');
    }

    if (await this.findByStage([StagePeriod.toStart])) {
      throw new BadRequestException(
        'No puede existir más de un período académico por iniciar.',
      );
    }

    const periodActive = await this.findByStage([StagePeriod.Planned]);
    const item = await this.repository.save(createDto);

    if (createDto.copyPrevious && periodActive) {
      this.copySchedulesPeriod(periodActive.id, item.id);
    }

    return await this.findOne(item.id);
  }

  findAll() {
    return this.repository.find({
      where: {
        deleted: false,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ResponsePeriodDto> {
    const item = await this.findValid(id);
    return new ResponsePeriodDto(item);
  }

  async update(
    id: number,
    updateDto: UpdatePeriodDto,
  ): Promise<ResponsePeriodDto> {
    if (await this.findByName(updateDto.name, id)) {
      throw new BadRequestException('Period already exists.');
    }
    const item = await this.repository.save({
      id,
      name: updateDto.name,
      description: updateDto?.description,
      status: updateDto?.status,
      duration: updateDto?.duration,
      end: updateDto?.end,
      start: updateDto?.start,
      stage: updateDto?.stage,
      startTime: updateDto?.startTime,
      endTime: updateDto?.endTime,
      interval: updateDto?.interval,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponsePeriodDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponsePeriodDto(await this.repository.save(item));
  }

  private async copySchedulesPeriod(lastPeriodId: number, periodId: number) {
    const sections = await this.sectionService.findAllOfPeriod(lastPeriodId);
    for (const section of sections) {
      const schedules = await this.scheduleService.findAllPeriod(lastPeriodId, {
        sectionId: section.id,
      });
      const sectionN = await this.sectionService.create({
        capacity: section.capacity,
        name: section.name,
        status: section.status,
        subject: {
          id: section.subject.id,
        },
        teacher: {
          id: section.teacher.id,
        },
        inscribed: 0,
        period: {
          id: periodId,
        },
      });
      if (schedules?.length) {
        const schedulesN: Array<CreateScheduleDto> = schedules.map(
          (schedule) => {
            return {
              classroom: {
                id: schedule.classroom.id,
              },
              day: {
                id: schedule.day.id,
              },
              end: schedule.end,
              period: {
                id: periodId,
              },
              section: {
                id: sectionN.id,
              },
              start: schedule.start,
              status: schedule.status,
            };
          },
        );
        await this.scheduleService.createMany(schedulesN);
      }
    }
  }
}
