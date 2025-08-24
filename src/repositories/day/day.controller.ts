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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '../../auth/login/login.guard';
import { DayService } from './day.service';
import { CreateDayDto } from './dto/create-day.dto';
import { ResponseDayDto } from './dto/response-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';

@ApiTags('day')
@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Post()
  @ApiResponse({
    type: ResponseDayDto,
  })
  create(@Body() createDayDto: CreateDayDto) {
    return this.dayService.create(createDayDto);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: ResponseDayDto,
    isArray: true,
  })
  findAll() {
    return this.dayService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseDayDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dayService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseDayDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDayDto: UpdateDayDto,
  ) {
    return this.dayService.update(+id, updateDayDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseDayDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dayService.remove(+id);
  }
}
