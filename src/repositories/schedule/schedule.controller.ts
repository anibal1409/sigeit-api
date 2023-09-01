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

import { GetSectionsDto } from '../section';
import { ResponseScheduleDto } from './dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleService } from './schedule.service';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @ApiResponse({
    type: ResponseScheduleDto,
  })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get('/period/:id')
  @ApiResponse({
    type: ResponseScheduleDto,
    isArray: true,
  })
  findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() data: GetSectionsDto,
  ) {
    return this.scheduleService.findAllPeriod(id, data);
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseScheduleDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.scheduleService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseScheduleDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseScheduleDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.scheduleService.remove(+id);
  }
}
