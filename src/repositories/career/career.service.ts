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
  CreateCareerDto,
  UpdateCareerDto,
} from './dto';
import { ResponseCareerDto } from './dto/response-career.dto';
import { Career } from './entities';

@Injectable()
export class CareerService implements CrudRepository<Career> {

  constructor(
    @InjectRepository(Career)
    private repository: Repository<Career>,
  ) { }

  async findValid(id: number): Promise<Career> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: ['department'],
    });
    if (!item) {
      throw new NotFoundException('Career not found');
    }
    return item;
  }

  findByName(name: string, id?: number): Promise<Career> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateCareerDto): Promise<ResponseCareerDto> {
    if (await this.findByName(createDto.name)) {
      throw new BadRequestException('Career already exists.');
    }

    const item = await this.repository.save(createDto);
    return await this.findOne(item.id);
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

  async findOne(id: number): Promise<ResponseCareerDto> {
    const item = await this.findValid(id);
    return new ResponseCareerDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateCareerDto,
  ): Promise<ResponseCareerDto> {
    if (await this.findByName(updateDto.name, id)) {
      throw new BadRequestException('Career already exists.');
    }
    const item = await this.repository.save({
      id,
      name: updateDto.name,
      description: updateDto?.description,
      abbreviation: updateDto?.abbreviation,
      logo: updateDto?.logo,
      department: updateDto.department,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseCareerDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseCareerDto(await this.repository.save(item));
  }
}
