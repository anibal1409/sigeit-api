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

import { ClassroomService } from './classroom.service';
import { GetClassroomsDto } from './dto';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { ResponseClassroomDto } from './dto/response-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@ApiTags('classroom')
@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  @ApiResponse({
    type: ResponseClassroomDto,
  })
  create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomService.create(createClassroomDto);
  }

  @Get()
  @ApiResponse({
    type: ResponseClassroomDto,
    isArray: true,
  })
  findAll(@Query() data: GetClassroomsDto) {
    return this.classroomService.findAll(data);
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseClassroomDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classroomService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseClassroomDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ) {
    return this.classroomService.update(+id, updateClassroomDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseClassroomDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.classroomService.remove(+id);
  }
}
