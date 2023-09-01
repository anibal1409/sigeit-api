import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { hashPassword } from '../../auth';
import { CrudRepository } from '../../common';
import { MailService } from '../../mail';
import {
  CreateUserDto,
  UserRespondeDto,
} from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';

@Injectable()
export class UserService implements CrudRepository<User> {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly mailService: MailService,
  ) { }

  async findValid(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOne(id: number): Promise<UserRespondeDto> {
    const user = await this.findValid(id);
    return new UserRespondeDto(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
      relations: ['school', 'department', 'teacher'],
    });
  }

  async findAll(): Promise<Array<UserRespondeDto>> {
    const data = await this.usersRepository.find({
      where: {
        deleted: false,
      },
      relations: ['school', 'department', 'teacher'],
      order: {
        name: 'ASC',
      },
    });

    return data.map((item) => new UserRespondeDto(item));
  }

  async create(creatrDto: CreateUserDto): Promise<UserRespondeDto> {
    try {
      const UserEmail = await this.findOneByEmail(creatrDto.email);
      if (UserEmail) {
        if (UserEmail.deleted) {
          throw new BadRequestException(
            'The user with this email was previously deleted.',
          );
        }
  
        throw new BadRequestException('E-mail in use');
      }
      const passwordDefault = (
        await hashPassword(Date.now().toString())
      ).substring(0, 10);
      console.log(passwordDefault);
      const user = this.usersRepository.create({
        email: creatrDto.email,
        password: await hashPassword(passwordDefault),
        name: creatrDto.name,
        role: creatrDto.role,
        teacher: {
          id: creatrDto.teacherId,
        },
        school: {
          id: creatrDto.schoolId,
        },
        department: {
          id: creatrDto.departmentId,
        },
      });
  
      console.log(user);
      
      const _userRes = await this.usersRepository.save(user);
      console.log(2222);
      
      await this.mailService.sendWelcome(
        creatrDto.email,
        creatrDto.name,
        passwordDefault,
      );
  
      return new UserRespondeDto(_userRes);
    } catch (error) {
      console.log(error);
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<UserRespondeDto> {
    const user = await this.findValid(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserRespondeDto(
      await this.usersRepository.save({
        email: updateUserDto?.email,
        name: updateUserDto?.name,
        status: updateUserDto?.status,
        role: updateUserDto?.role,
        teacher: {
          id: updateUserDto?.teacherId,
        },
        school: {
          id: updateUserDto?.schoolId,
        },
        department: {
          id: updateUserDto?.departmentId,
        },
      }),
    );
  }

  async changePassword(
    email: string,
    id: number,
    newPassword: string
  ): Promise<boolean> {
    if (!newPassword) {
      throw new BadRequestException('Password is required');
    }

    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    if (user.email != email || user.id != id) {
      throw new BadRequestException('E-mail or ID is invalid');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _oldPassword, ...response } = user;

    await this.usersRepository.save({
      password: await hashPassword(newPassword),
      ...response,
    });

    return true;
  }

  async remove(id: number): Promise<UserRespondeDto> {
    const user = await this.findValid(id);
    user.deleted = true;
    return new UserRespondeDto(await this.usersRepository.save(user));
  }
}
