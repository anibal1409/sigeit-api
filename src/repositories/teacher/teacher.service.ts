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
  CreateTeacherDto,
  UpdateTeacherDto,
} from './dto';
import { ResponseTeacherDto } from './dto/response-teacher.dto';
import { Teacher } from './entities';

@Injectable()
export class TeacherService implements CrudRepository<Teacher> {

  constructor(
    @InjectRepository(Teacher)
    private repository: Repository<Teacher>,
  ) { }

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

  findByIdDocument(id_document: string, id?: number): Promise<Teacher> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        id_document,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateTeacherDto): Promise<ResponseTeacherDto> {
    if (await this.findByIdDocument(createDto.id_document)) {
      throw new BadRequestException('Teacher already exists.');
    }

    const item = await this.repository.save(createDto);
    return await this.findOne(item.id);
  }

  findAll()  {
    return this.repository.find({
      where: {
        deleted: false,
      },
      order: {
        last_name: 'ASC',
      },
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
        last_name: 'ASC',
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
    if (await this.findByIdDocument(updateDto.id_document, id)) {
      throw new BadRequestException('Teacher already exists.');
    }
    const item = await this.repository.save({
      id,
      id_document: updateDto.id_document,
      first_name: updateDto.first_name,
      last_name: updateDto.last_name,
      status: updateDto.status,
      email: updateDto.email,
      department: {
        id: updateDto.departmentId,
      },
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseTeacherDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseTeacherDto(await this.repository.save(item));
  }
}

