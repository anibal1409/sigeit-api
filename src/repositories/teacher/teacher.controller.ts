import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetTeachersDto } from './dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ResponseTeacherDto } from './dto/response-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherService } from './teacher.service';

@ApiTags('teacher')
// @Public()
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @ApiResponse({
    type: ResponseTeacherDto,
  })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  @ApiResponse({
    type: ResponseTeacherDto,
    isArray: true,
  })
  findAll(@Query() data: GetTeachersDto) {
    return this.teacherService.findAll(data);
  }

  @Get('/department/:id')
  @ApiResponse({
    type: ResponseTeacherDto,
    isArray: true,
  })
  findAllDepartment(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.findAllDepartment(id);
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseTeacherDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseTeacherDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseTeacherDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.remove(+id);
  }
}
