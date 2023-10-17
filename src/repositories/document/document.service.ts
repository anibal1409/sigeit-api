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
  CreateDocumentDto,
  ResponseDocumentDto,
  UpdateDocumentDto,
} from './dto';
import { DocumentE } from './entities';

@Injectable()
export class DocumentService implements CrudRepository<DocumentE> {

  constructor(
    @InjectRepository(DocumentE)
    private repository: Repository<DocumentE>,
  ) { }

  async findValid(id: number): Promise<DocumentE> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: ['department'],
    });
    if (!item) {
      throw new NotFoundException('Document not found');
    }
    return item;
  }

  findByName(
    name: string,
    departmentId: number,
    id?: number,
  ): Promise<DocumentE> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        department: {
          id: departmentId,
        },
        deleted: false,
      },
    });
  }

  async findActive(): Promise<DocumentE> {
    const item = await this.repository.findOne({
      where: {
        deleted: false,
        status: true,
      },
      relations: [],
    });
    if (!item) {
      throw new NotFoundException('Document not found');
    }
    return item;
  }

  async create(createDto: CreateDocumentDto): Promise<ResponseDocumentDto> {
    if (await this.findByName(createDto.name, createDto.department.id)) {
      throw new BadRequestException('Document already exists.');
    }

    const item = await this.repository.save(createDto);

    return await this.findOne(item.id);
  }

  findAll() {
    return this.repository.find({
      where: {
        deleted: false,
      },
      relations: ['department'],
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ResponseDocumentDto> {
    const item = await this.findValid(id);
    return new ResponseDocumentDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateDocumentDto,
  ): Promise<ResponseDocumentDto> {
    if (await this.findByName(updateDto.name, updateDto.department.id, id)) {
      throw new BadRequestException('Document already exists.');
    }
    const item = await this.repository.save({
      id,
      name: updateDto.name,
      description: updateDto.description,
      status: updateDto?.status,
      department: updateDto?.department,
      type: updateDto?.type,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseDocumentDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseDocumentDto(await this.repository.save(item));
  }
}