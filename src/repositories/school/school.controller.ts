import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateSchoolDto } from './dto/create-school.dto';
import { ResponseSchoolDto } from './dto/response-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { SchoolService } from './school.service';

@ApiTags('school')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @ApiResponse({
    type: ResponseSchoolDto,
  })
  create(@Body() createSchoolDto: CreateSchoolDto) {
    console.log('createSchoolDto', createSchoolDto);
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  @ApiResponse({
    type: ResponseSchoolDto,
    isArray: true,
  })
  findAll() {
    return this.schoolService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseSchoolDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.schoolService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseSchoolDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    return this.schoolService.update(+id, updateSchoolDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseSchoolDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.schoolService.remove(+id);
  }
}
