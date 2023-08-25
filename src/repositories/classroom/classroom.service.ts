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
  UpdateClassroomDto,
} from './dto';
import { ResponseClassroomDto } from './dto/response-classroom.dto';
import {
  Classroom,
  ClassroomDepartment,
} from './entities';

@Injectable()
export class ClassroomService implements CrudRepository<Classroom> {

  constructor(
    @InjectRepository(Classroom)
    private repository: Repository<Classroom>,
    @InjectRepository(ClassroomDepartment)
    private repository2: Repository<ClassroomDepartment>,
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
    if (this.findByName(createDto.name)) {
      throw new BadRequestException('Classroom already exists.');
    }

    const item = await this.repository.save(createDto);
    await this.createClassroomDepartments(item.id, item.departmentIds);
    return await this.findOne(item.id);
  }

  private async createClassroomDepartments(
    classroomId: number,
    departmentIds: number[],
  ) {
    return this.repository2.save(
      departmentIds.map((id) => ({
        classroom: {
          id: classroomId,
        },
        department: {
          id,
        },
      })));
  }

  private deleteClassroomDepartments(classroomId: number) {
    return this.repository2.delete({
      classroom: {
        id: classroomId,
      },
    });
  }

  findAll() {
    return this.repository.find({
      where: {
        deleted: false,
        status: true,
      },
      relations: ['departments'],
      order: {
        name: 'ASC',
      },
    });
  }

  findAllDepartment(id: number) {
    return this.repository2.find({
      where: {
        department: {
          id,
        },
      },
      relations: ['departments'],
    });
  }

  findOneDepartments(id: number) {
    return this.repository2.find({
      where: {
        classroom: {
          id,
        },
      },
      relations: ['departments'],
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
    await this.findByName(updateDto.name, id);
    const item = await this.repository.save({
      id,
      name: updateDto.name,
      description: updateDto?.description,
      status: updateDto?.status,
      type: updateDto?.type,
    });
    await this.deleteClassroomDepartments(id);
    await this.createClassroomDepartments(id, updateDto.departmentIds);

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseClassroomDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseClassroomDto(await this.repository.save(item));
  }
}

