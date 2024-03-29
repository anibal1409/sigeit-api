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

import { CrudRepository } from '../../common/use-case';
import {
  CreateDepartmentDto,
  GetDepartmentsDto,
  UpdateDepartmentDto,
} from './dto';
import { ResponseDepartmentDto } from './dto/response-depatment.dto';
import { Department } from './entities';

@Injectable()
export class DepartmentService implements CrudRepository<Department> {

  constructor(
    @InjectRepository(Department)
    private repository: Repository<Department>,
  ) { }

  async findValid(id: number): Promise<Department> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: ['school'],
    });
    if (!item) {
      throw new NotFoundException('Department not found');
    }
    return item;
  }

  findByName(name: string, id?: number): Promise<Department> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateDepartmentDto): Promise<ResponseDepartmentDto> {
    if (await this.findByName(createDto.name)) {
      throw new BadRequestException('Department already exists.');
    }

    const item = await this.repository.save(createDto);
    return this.findOne(item.id);
  }

  findAll(data: GetDepartmentsDto) {
    return this.repository.find({
      where: {
        deleted: false,
        status: data?.status,
        school: {
          id: data?.schoolId || Not(0),
        },
      },
      relations: ['school'],
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ResponseDepartmentDto> {
    const item = await this.findValid(id);
    return new ResponseDepartmentDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateDepartmentDto,
  ): Promise<ResponseDepartmentDto> {
    if (await this.findByName(updateDto.name, id)) {
      throw new BadRequestException('Department already exists.');
    }
    const item = await this.repository.save({
      id,
      name: updateDto.name,
      description: updateDto?.description,
      abbreviation: updateDto.abbreviation,
      logo: updateDto?.logo,
      school: updateDto?.school,
      status: updateDto.status,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseDepartmentDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseDepartmentDto(await this.repository.save(item));
  }
}
