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
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { DepartamentService } from './departament.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { ResponseDepartmentDto } from './dto/response-depatment.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('departament')
@Controller('departament')
export class DepartamentController {
  constructor(private readonly departamentService: DepartamentService) {}

  @Post()
  @ApiResponse({
    type: ResponseDepartmentDto,
  })
  create(@Body() createDepartamentDto: CreateDepartmentDto) {
    return this.departamentService.create(createDepartamentDto);
  }

  @Get()
  @ApiResponse({
    type: ResponseDepartmentDto,
    isArray: true,
  })
  findAll() {
    return this.departamentService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseDepartmentDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departamentService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseDepartmentDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartamentDto: UpdateDepartmentDto,
  ) {
    return this.departamentService.update(+id, updateDepartamentDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseDepartmentDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departamentService.remove(+id);
  }
}
