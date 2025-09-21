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
  Res,
} from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { Public } from '../../auth/login/login.guard';
import {
  DownloadPlannedSchedulesDto,
  GetSchedulesDto,
  ResponseScheduleDto,
} from './dto';
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

  @Public()
  @Get('/period/:id')
  @ApiResponse({
    type: ResponseScheduleDto,
    isArray: true,
  })
  findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() data: GetSchedulesDto,
  ) {
    return this.scheduleService.findAllPeriod(id, data);
  }

  @Public()
  @Get('students/period/:id')
  @ApiResponse({
    type: ResponseScheduleDto,
    isArray: true,
  })
  findAllStudents(
    @Param('id', ParseIntPipe) id: number,
    @Query() data: GetSchedulesDto,
  ) {
    return this.scheduleService.findAllPeriod(id, data, true);
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

  @Get('download/planned-schedules')
  @ApiOkResponse({
    description: 'Información del archivo Excel con los horarios planificados',
    schema: {
      type: 'object',
      properties: {
        fileName: { type: 'string' },
        downloadUrl: { type: 'string' },
        contentType: { type: 'string' }
      }
    }
  })
  async downloadPlannedSchedules(@Query() dto: DownloadPlannedSchedulesDto) {
    const fileName = `planificacion_academica_${dto.departmentId}_${dto.periodId}_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Generar la URL de descarga
    const params = new URLSearchParams({
      departmentId: dto.departmentId.toString(),
      periodId: dto.periodId.toString(),
      ...(dto.status && { status: dto.status.toString() }),
      ...(dto.groupBy && { groupBy: dto.groupBy })
    });
    
    const downloadUrl = `/api/schedule/download-file/planned-schedules?${params.toString()}`;
    
    return {
      fileName,
      downloadUrl,
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };
  }

  @Get('download-file/planned-schedules')
  async downloadFilePlannedSchedules(
    @Query() dto: DownloadPlannedSchedulesDto,
    @Res() res: Response,
  ) {
    try {
      const buffer = await this.scheduleService.downloadPlannedSchedules(dto);
      const fileName = `planificacion_academica_${dto.departmentId}_${dto.periodId}_${new Date().toISOString().split('T')[0]}.xlsx`;

      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Length', buffer.length.toString());
      
      res.end(buffer);
    } catch (error) {
      res.status(500).json({ message: 'Error generating Excel file' });
    }
  }
}
