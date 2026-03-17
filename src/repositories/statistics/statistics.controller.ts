import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  PeriodAndOptionalClassroomQueryDto,
  PeriodComparisonQueryDto,
  SinglePeriodQueryDto,
} from './dto';
import {
  CareerSectionStatItemDto,
  ClassroomUsageItemDto,
  CurriculumSemesterStatItemDto,
  DepartmentStatItemDto,
  PeriodComparisonResponseDto,
  SectionOpenDistributionItemDto,
  StartTimeSlotItemDto,
  SubjectStatItemDto,
  TeacherWorkloadItemDto,
  TeachersByDayResponseDto,
  TimelineItemDto,
} from './dto/response-statistics.dto';
import { StatisticsService } from './statistics.service';

/**
 * Estadísticas para gráficos (sin uso de inscripciones).
 */
@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('period-comparison')
  @ApiOperation({ summary: 'Comparar períodos: secciones, cupo y horas-materia' })
  @ApiResponse({ type: PeriodComparisonResponseDto })
  periodComparison(@Query() q: PeriodComparisonQueryDto) {
    return this.statisticsService.getPeriodComparison(q.periodIds);
  }

  @Get('teachers-by-day')
  @ApiOperation({ summary: 'Profesores distintos con clase por día de la semana' })
  @ApiResponse({ type: TeachersByDayResponseDto })
  teachersByDay(@Query() q: SinglePeriodQueryDto) {
    return this.statisticsService.getTeachersByDay(q.periodId);
  }

  @Get('by-department')
  @ApiOperation({ summary: 'Secciones y cupo por departamento' })
  @ApiResponse({ type: [DepartmentStatItemDto] })
  byDepartment(@Query() q: SinglePeriodQueryDto) {
    return this.statisticsService.getByDepartment(q.periodId);
  }

  @Get('by-subject')
  @ApiOperation({ summary: 'Secciones y cupo por materia' })
  @ApiResponse({ type: [SubjectStatItemDto] })
  bySubject(@Query() q: SinglePeriodQueryDto) {
    return this.statisticsService.getBySubject(q.periodId);
  }

  @Get('teacher-workload')
  @ApiOperation({ summary: 'Carga docente: secciones, bloques horario y horas-materia' })
  @ApiResponse({ type: [TeacherWorkloadItemDto] })
  teacherWorkload(@Query() q: SinglePeriodQueryDto) {
    return this.statisticsService.getTeacherWorkload(q.periodId);
  }

  @Get('classroom-usage')
  @ApiOperation({ summary: 'Bloques planificados por aula' })
  @ApiResponse({ type: [ClassroomUsageItemDto] })
  classroomUsage(@Query() q: PeriodAndOptionalClassroomQueryDto) {
    return this.statisticsService.getClassroomUsage(
      q.periodId,
      q.classroomId,
    );
  }

  @Get('start-time-distribution')
  @ApiOperation({ summary: 'Distribución de bloques por hora de inicio' })
  @ApiResponse({ type: [StartTimeSlotItemDto] })
  startTimeDistribution(@Query() q: PeriodAndOptionalClassroomQueryDto) {
    return this.statisticsService.getStartTimeDistribution(
      q.periodId,
      q.classroomId,
    );
  }

  @Get('section-open-distribution')
  @ApiOperation({
    summary: 'Secciones abiertas a todas las carreras vs restringidas',
  })
  @ApiResponse({ type: [SectionOpenDistributionItemDto] })
  sectionOpenDistribution(@Query() q: SinglePeriodQueryDto) {
    return this.statisticsService.getSectionOpenDistribution(q.periodId);
  }

  @Get('timeline')
  @ApiOperation({ summary: 'Evolución por período (todos los períodos activos)' })
  @ApiResponse({ type: [TimelineItemDto] })
  timeline() {
    return this.statisticsService.getTimeline();
  }

  @Get('by-career')
  @ApiOperation({
    summary: 'Secciones por carrera (vía materias vinculadas)',
  })
  @ApiResponse({ type: [CareerSectionStatItemDto] })
  byCareer(@Query() q: SinglePeriodQueryDto) {
    return this.statisticsService.getByCareer(q.periodId);
  }

  @Get('by-curriculum-semester')
  @ApiOperation({ summary: 'Oferta por semestre del pensum (materia.semester)' })
  @ApiResponse({ type: [CurriculumSemesterStatItemDto] })
  byCurriculumSemester(@Query() q: SinglePeriodQueryDto) {
    return this.statisticsService.getByCurriculumSemester(q.periodId);
  }
}
