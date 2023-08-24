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
  CreateDayDto,
  ResponseDayDto,
  UpdateDayDto,
} from './dto';
import { Day } from './entities';

@Injectable()
export class DayService implements CrudRepository<Day> {

  constructor(
    @InjectRepository(Day)
    private repository: Repository<Day>,
  ) { }

  async findValid(id: number): Promise<Day> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: [],
    });
    if (!item) {
      throw new NotFoundException('Day not found');
    }
    return item;
  }

  findByName(name: string, id?: number): Promise<Day> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateDayDto): Promise<ResponseDayDto> {
    if (this.findByName(createDto.name)) {
      throw new BadRequestException('Day already exists.');
    }

    const day = await this.repository.save(createDto);
    return await this.findOne(day.id);
  }

  findAll() {
    return this.repository.find({
      where: {
        status: true,
        deleted: false,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ResponseDayDto> {
    const item = await this.findValid(id);
    return new ResponseDayDto(item);
  }

  async update(id: number, updateDto: UpdateDayDto): Promise<ResponseDayDto> {
    await this.findByName(updateDto.name, id);
    const item = await this.repository.save({
      id,
      name: updateDto.name,
      abbreviation: updateDto?.abbreviation,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseDayDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseDayDto(await this.repository.save(item));
  }
}

