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
  ValidationPipe,
} from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { Public } from '../../auth/login/login.guard';
import {
  CreateSchedulesBulkDto,
  DownloadPlannedSchedulesDto,
  FreeSlotDto,
  FreeSlotsQueryDto,
  GetSchedulesDto,
  PeriodAuditDto,
  PlanningPeriodQueryDto,
  ResponseScheduleDto,
  ScheduleConflictsDto,
  ScheduleConflictsQueryDto,
  SectionCoverageDto,
} from './dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleConflictService } from './schedule-conflict.service';
import { SchedulePlanningService } from './schedule-planning.service';
import { ScheduleService } from './schedule.service';

/** Convierte los parámetros de query a sus tipos (números, booleanos) antes de validarlos. */
const QueryTransform = new ValidationPipe({ transform: true });

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly conflictService: ScheduleConflictService,
    private readonly planningService: SchedulePlanningService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crea un horario',
    description:
      'Valida horas HH:mm, franja del período y sección. Responde 409 con `conflicts` si choca en aula o profesor, salvo `force: true`.',
  })
  @ApiResponse({
    type: ResponseScheduleDto,
  })
  @ApiConflictResponse({
    description: 'Choques de aula o profesor (detalle en `conflicts`)',
  })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Post('bulk')
  @ApiOperation({
    summary: 'Crea el mismo bloque en varios días',
    description:
      'Valida todos los días y guarda todos o ninguno. 409 con `conflicts` por día.',
  })
  @ApiResponse({ type: ResponseScheduleDto, isArray: true })
  @ApiConflictResponse({
    description: 'Choques de aula o profesor en algún día',
  })
  createBulk(@Body() dto: CreateSchedulesBulkDto) {
    return this.scheduleService.createBulk(dto);
  }

  @Get('planning/conflicts')
  @ApiOperation({
    summary: 'Choques de aula, profesor y nivel de un bloque candidato',
  })
  @ApiOkResponse({ type: ScheduleConflictsDto })
  findConflicts(@Query(QueryTransform) query: ScheduleConflictsQueryDto) {
    return this.conflictService.findConflicts(query);
  }

  @Get('planning/free-slots')
  @ApiOperation({
    summary: 'Bloques libres para una sección, con las aulas disponibles',
  })
  @ApiOkResponse({ type: FreeSlotDto, isArray: true })
  findFreeSlots(@Query(QueryTransform) query: FreeSlotsQueryDto) {
    return this.planningService.findFreeSlots(query);
  }

  @Get('planning/hours-coverage')
  @ApiOperation({
    summary: 'Horas académicas asignadas vs. requeridas por sección',
  })
  @ApiOkResponse({ type: SectionCoverageDto, isArray: true })
  findHoursCoverage(@Query(QueryTransform) query: PlanningPeriodQueryDto) {
    return this.planningService.findHoursCoverage(query);
  }

  @Get('planning/audit')
  @ApiOperation({
    summary: 'Auditoría completa de la planificación de un período',
  })
  @ApiOkResponse({ type: PeriodAuditDto })
  audit(@Query(QueryTransform) query: PlanningPeriodQueryDto) {
    return this.planningService.audit(query);
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
  @ApiConflictResponse({
    description: 'Choques de aula o profesor (detalle en `conflicts`)',
  })
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
        contentType: { type: 'string' },
      },
    },
  })
  async downloadPlannedSchedules(@Query() dto: DownloadPlannedSchedulesDto) {
    const fileName = `planificacion_academica_${dto.departmentId}_${dto.periodId}_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Generar la URL de descarga
    const params = new URLSearchParams({
      departmentId: dto.departmentId.toString(),
      periodId: dto.periodId.toString(),
      ...(dto.status && { status: dto.status.toString() }),
      ...(dto.groupBy && { groupBy: dto.groupBy }),
    });

    const downloadUrl = `/api/schedule/download-file/planned-schedules?${params.toString()}`;

    return {
      fileName,
      downloadUrl,
      contentType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
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

      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${fileName}"`,
      );
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Length', buffer.length.toString());

      res.end(buffer);
    } catch (error) {
      res.status(500).json({ message: 'Error generating Excel file' });
    }
  }
}
