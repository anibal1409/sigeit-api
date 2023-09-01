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
import {
  Subject,
  SubjectCarrer,
} from './entities';

@Injectable()
export class SubjectService implements CrudRepository<Subject> {

  constructor(
    @InjectRepository(Subject)
    private repository: Repository<Subject>,
    @InjectRepository(SubjectCarrer)
    private repository2: Repository<SubjectCarrer>,
  ) { }

  async findValid(id: number): Promise<Subject> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: [],
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

  private async createSubjectCarrers(subjectId: number, careerIds: number[]) {
    return this.repository2.save(
      careerIds.map((id) => ({
        subject: {
          id: subjectId,
        },
        career: {
          id,
        },
      })));
  }

  private deleteSubjectCareers(subjectId: number) {
    return this.repository2.delete({
      subject: {
        id: subjectId,
      },
    });
  }

  async create(createDto: CreateSubjectDto): Promise<ResponseSubjectDto> {
    if (await this.findByCode(createDto.code)) {
      throw new BadRequestException('Code subject already exists.');
    }

    const item = await this.repository.save(createDto);
    await this.createSubjectCarrers(item.id, item.careerIds);
    return await this.findOne(item.id);
  }

  findAll() {
    return this.repository.find({
      where: {
        deleted: false,
      },
      order: {
        department: {
          id: 'ASC',
        },
        semester: 'ASC',
        name: 'ASC',
      },
    });
  }

  findAllDepartment(departmentId: number, query?: GetSubjectDepartmentDto) {
    return this.repository.find({
      where: {
        deleted: false,
        department: {
          id: departmentId,
        },
        semester: query?.semester || Not(0),
      },
      order: {
        semester: 'ASC',
        name: 'ASC',
      },
    });
  }

  async findAllCareer(careerId: number, query?: GetSubjectDepartmentDto) {
    const subjectCareer = await this.repository2.find({
      where: {
        career: {
          id: careerId,
        },
        subject: {
          semester: query?.semester || Not(0),
        },
      },
      order: {
        subject: {
          semester: 'ASC',
          name: 'ASC',
        },
      },
    });
    const subjects = subjectCareer.map((item) => {
      return new ResponseSubjectDto(item.subject);
    });
    return subjects;
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
      department: {
        id: updateDto.departmentId,
      },
      semester: updateDto.semester,
      credits: updateDto.credits,
      hours: updateDto.hours,
      type_curriculum: updateDto.type_curriculum,
      status: updateDto.status,
    });
    await this.deleteSubjectCareers(id);
    await this.createSubjectCarrers(item.id, updateDto.careerIds);

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseSubjectDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseSubjectDto(await this.repository.save(item));
  }
}

