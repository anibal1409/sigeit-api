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
  ) {}

  async findValid(id: number): Promise<School> {
    const school = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: [],
    });
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school;
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
    if (this.findByName(createSchoolDto.name)) {
      throw new BadRequestException('School already exists.');
    }

    const school = await this.repository.save(createSchoolDto);
    return await this.findOne(school.id);
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
    const school = await this.findValid(id);
    return new ResponseSchoolDto(school);
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto): Promise<ResponseSchoolDto> {
    await this.findByName(updateSchoolDto.name, id);
    const school = await this.findValid(id);
    school.name = updateSchoolDto.name;
    school.description =
      updateSchoolDto?.description || school.description;
    school.abbreviation = updateSchoolDto?.abbreviation || school.abbreviation;
    school.logo = updateSchoolDto?.logo || school.logo;
    return new ResponseSchoolDto(
      await this.repository.save(school)
    );
  }

  async remove(id: number): Promise<ResponseSchoolDto> {
    const school = await this.findValid(id);
    school.deleted = true;
    return new ResponseSchoolDto(
      await this.repository.save(school)
    );
  }
}