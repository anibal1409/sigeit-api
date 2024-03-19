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
import { CreateSchoolDto } from './dto/create-school.dto';
import { ResponseSchoolDto } from './dto/response-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './entities';

@Injectable()
export class SchoolService implements CrudRepository<School> {
  constructor(
    @InjectRepository(School)
    private repository: Repository<School>,
  ) { }

  async findValid(id: number): Promise<School> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: [],
    });
    if (!item) {
      throw new NotFoundException('School not found');
    }
    return item;
  }

  findByName(name: string, id?: number): Promise<School> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  async create(createSchoolDto: CreateSchoolDto): Promise<ResponseSchoolDto> {
    const school = await this.findByName(createSchoolDto.name);
    if (school) {
      throw new BadRequestException('School already exists.');
    }

    const item = await this.repository.save(createSchoolDto);
    return this.findOne(item.id);
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

  async findOne(id: number): Promise<ResponseSchoolDto> {
    const item = await this.findValid(id);
    return new ResponseSchoolDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateSchoolDto,
  ): Promise<ResponseSchoolDto> {
    if (await this.findByName(updateDto.name, id)) {
      throw new BadRequestException('School already exists.');
    }
    const item = await this.repository.save({
      id,
      name: updateDto.name,
      description: updateDto?.description,
      abbreviation: updateDto.abbreviation,
      logo: updateDto?.logo,
      status: updateDto.status,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseSchoolDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseSchoolDto(await this.repository.save(item));
  }
}
