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
  CreateClassroomDto,
  GetClassroomsDto,
  UpdateClassroomDto,
} from './dto';
import { ResponseClassroomDto } from './dto/response-classroom.dto';
// eslint-disable-next-line prettier/prettier
import { Classroom } from './entities';

@Injectable()
export class ClassroomService implements CrudRepository<Classroom> {

  constructor(
    @InjectRepository(Classroom)
    private repository: Repository<Classroom>,
  ) { }

  async findValid(id: number): Promise<Classroom> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: ['departments'],
    });
    if (!item) {
      throw new NotFoundException('Classroom not found');
    }
    return item;
  }

  findByName(name: string, id?: number): Promise<Classroom> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateClassroomDto): Promise<ResponseClassroomDto> {
    if (await this.findByName(createDto.name)) {
      throw new BadRequestException('Classroom already exists.');
    }

    const item = await this.repository.save(createDto);

    return await this.findOne(item.id);
  }

  findAll(data: GetClassroomsDto) {
    return this.repository.find({
      where: {
        deleted: false,
        departments: {
          id: data.departmentId,
        },
      },
      relations: ['departments'],
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ResponseClassroomDto> {
    const item = await this.findValid(id);
    return new ResponseClassroomDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateClassroomDto,
  ): Promise<ResponseClassroomDto> {
    if (await this.findByName(updateDto.name, id)) {
      throw new BadRequestException('Classroom already exists.');
    }
    const item = await this.repository.save({
      id,
      name: updateDto.name,
      description: updateDto?.description,
      status: updateDto?.status,
      type: updateDto?.type,
      departments: updateDto?.departments,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseClassroomDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseClassroomDto(await this.repository.save(item));
  }
}
