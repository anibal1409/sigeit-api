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
  CreateSubjectDto,
  GetSubjectDepartmentDto,
  UpdateSubjectDto,
} from './dto';
import { ResponseSubjectDto } from './dto/response-subject.dto';
import { Subject } from './entities';

@Injectable()
export class SubjectService implements CrudRepository<Subject> {

  constructor(
    @InjectRepository(Subject)
    private repository: Repository<Subject>,
  ) {}

  async findValid(id: number): Promise<Subject> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: ['department', 'careers'],
    });
    if (!item) {
      throw new NotFoundException('Subject not found');
    }
    return item;
  }

  findByName(name: string, id?: number): Promise<Subject> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  findByCode(code: string, id?: number): Promise<Subject> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        code,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateSubjectDto): Promise<ResponseSubjectDto> {
    if (await this.findByCode(createDto.code)) {
      throw new BadRequestException('Code subject already exists.');
    }

    const item = await this.repository.save(createDto);

    return await this.findOne(item.id);
  }

  findAll(data: GetSubjectDepartmentDto) {
    return this.repository.find({
      where: {
        deleted: false,
        department: {
          id: data.departmentId,
        },
        careers: {
          id: data.careerId,
        },
        semester: data.semester,
      },
      relations: ['department', 'careers'],
      order: {
        department: {
          id: 'ASC',
        },
        semester: 'ASC',
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ResponseSubjectDto> {
    const item = await this.findValid(id);
    return new ResponseSubjectDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateSubjectDto,
  ): Promise<ResponseSubjectDto> {
    if (await this.findByCode(updateDto.code, id)) {
      throw new BadRequestException('Subject already exists.');
    }
    const item = await this.repository.save({
      id,
      name: updateDto.name,
      description: updateDto?.description,
      code: updateDto?.code,
      department: updateDto.department,
      semester: updateDto.semester,
      credits: updateDto.credits,
      hours: updateDto.hours,
      type_curriculum: updateDto.typeCurriculum,
      status: updateDto.status,
      careers: updateDto.careers,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseSubjectDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseSubjectDto(await this.repository.save(item));
  }
}
