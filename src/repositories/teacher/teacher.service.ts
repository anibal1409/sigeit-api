import {
  Not,
  Repository,
} from 'typeorm';

import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRepository } from '../../common';
import { UserService } from '../user';
import {
  CreateTeacherDto,
  GetTeachersDto,
  UpdateTeacherDto,
} from './dto';
import { ResponseTeacherDto } from './dto/response-teacher.dto';
import { Teacher } from './entities';

@Injectable()
export class TeacherService implements CrudRepository<Teacher> {

  constructor(
    @InjectRepository(Teacher)
    private repository: Repository<Teacher>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
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

  findByIdDocument(idDocument: string, id?: number): Promise<Teacher> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        idDocument,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateTeacherDto): Promise<ResponseTeacherDto> {
    if (await this.findByIdDocument(createDto.idDocument)) {
      throw new BadRequestException('Teacher already exists.');
    }

    const item = await this.repository.save(createDto);
    await this.updateUser(item);

    return await this.findOne(item.id);
  }

  findAll(data: GetTeachersDto) {
    return this.repository.find({
      where: {
        deleted: false,
        department: {
          id: data?.departmentId || Not(0),
          school: {
            id: data?.schoolId || Not(0),
          },
        },
      },
      order: {
        lastName: 'ASC',
      },
      relations: ['department'],
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
        lastName: 'ASC',
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
    if (await this.findByIdDocument(updateDto.idDocument, id)) {
      throw new BadRequestException('Teacher already exists.');
    }
    console.log('updateDto', updateDto);
    
    const item = await this.repository.save({
      id,
      idDocument: updateDto.idDocument,
      firstName: updateDto.firstName,
      lastName: updateDto.lastName,
      status: updateDto.status,
      email: updateDto.email,
      department: updateDto.department,
    });
    console.log('item', item);
    // await this.updateUser(item);

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseTeacherDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseTeacherDto(await this.repository.save(item));
  }

  private async updateUser(teacher: Teacher): Promise<void> {
    const user = await this.userService.findOneByIdDocument(teacher.idDocument);
    console.log('user', user);
    if (user && user.idDocument === teacher.idDocument) {
      await this.userService.updateTeacher(user.id, teacher.id);
    }
  }
}

