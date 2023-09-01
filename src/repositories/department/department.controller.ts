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
// eslint-disable-next-line prettier/prettier
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { DepartmentService } from './department.service';
import {
  CreateDepartmentDto,
  GetDepartmentsDto,
  ResponseDepartmentDto,
  UpdateDepartmentDto,
} from './dto';

@ApiTags('department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiResponse({
    type: ResponseDepartmentDto,
  })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  @ApiResponse({
    type: ResponseDepartmentDto,
    isArray: true,
  })
  findAll(@Query() data: GetDepartmentsDto) {
    return this.departmentService.findAll(data);
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseDepartmentDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseDepartmentDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseDepartmentDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departmentService.remove(+id);
  }
}
