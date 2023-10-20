import { Request } from 'express';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserRespondeDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from './enums';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    type: UserRespondeDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/student')
  @ApiResponse({
    type: UserRespondeDto,
  })
  createStudent(@Body() createUserDto: CreateUserDto) {
    return this.userService.create({ ...createUserDto, role: Roles.Student });
  }

  @Get()
  @ApiResponse({
    type: UserRespondeDto,
    isArray: true,
  })
  findAll(@Req() request: Request) {
    return this.userService.findAll(+request.cookies?.['sigeit-cookie']?.id);
  }

  @Get(':id')
  @ApiResponse({
    type: UserRespondeDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: UserRespondeDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: UserRespondeDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }
}
