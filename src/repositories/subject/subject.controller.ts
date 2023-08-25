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
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetSubjectDepartmentDto } from './dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { ResponseSubjectDto } from './dto/response-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectService } from './subject.service';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @ApiResponse({
    type: ResponseSubjectDto,
  })
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  @ApiResponse({
    type: ResponseSubjectDto,
    isArray: true,
  })
  findAll() {
    return this.subjectService.findAll();
  }

  @Get('/department/:id')
  @ApiResponse({
    type: ResponseSubjectDto,
    isArray: true,
  })
  findAllDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Query() data: GetSubjectDepartmentDto,
  ) {
    return this.subjectService.findAllDepartment(id, data);
  }

  @Get('/career/:id')
  @ApiResponse({
    type: ResponseSubjectDto,
    isArray: true,
  })
  findAllCareer(
    @Param('id', ParseIntPipe) id: number,
    @Query() data: GetSubjectDepartmentDto,
  ) {
    return this.subjectService.findAllCareer(id, data);
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseSubjectDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseSubjectDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseSubjectDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.remove(+id);
  }
}
