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
  ) { }

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

  async findActive(): Promise<Period> {
    const item = await this.repository.findOne({
      where: {
        deleted: false,
        status: true,
        stage: StagePeriod.toPlan,
      },
      relations: [],
    });
    if (!item) {
      throw new NotFoundException('Period not found');
    }
    return item;
  }

  async create(createDto: CreatePeriodDto): Promise<ResponsePeriodDto> {
    if (await this.findByName(createDto.name)) {
      throw new BadRequestException('Period already exists.');
    }
    console.log(createDto);
    

    const item = await this.repository.save(createDto);
    console.log(item);
    
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
}