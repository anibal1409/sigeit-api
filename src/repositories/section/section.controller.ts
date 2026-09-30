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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  GenerateReportDto,
  GetSectionsDto,
  GetSectionTeachersDto,
  ReportResponseDto,
  ResponseSectionDto,
  ResponseSectionTeacherDto,
} from './dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { SectionTeacherService } from './section-teacher.service';
import { SectionService } from './section.service';

@ApiTags('section')
@Controller('section')
export class SectionController {
  constructor(
    private readonly sectionService: SectionService,
    private readonly sectionTeacherService: SectionTeacherService,
  ) {}

  @Post()
  @ApiResponse({
    type: ResponseSectionDto,
  })
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @Get('/period/:periodId')
  @ApiResponse({
    type: ResponseSectionDto,
    isArray: true,
  })
  findAll(
    @Param('periodId', ParseIntPipe) periodId: number,
    @Query() data: GetSectionsDto,
  ) {
    return this.sectionService.findAllOfPeriod(+periodId, data);
  }

  @Get('/period/:periodId/sections')
  @ApiResponse({
    type: ResponseSectionDto,
    isArray: true,
  })
  findSectionsByPeriod(
    @Param('periodId', ParseIntPipe) periodId: number,
    @Query() data: GetSectionsDto,
  ) {
    return this.sectionService.findAllOfPeriod(+periodId, data);
  }

  @Get('/period/:periodId/teachers')
  @ApiOperation({
    summary:
      'Profesores para asignar a secciones: carga del período y, con subjectId, historial y notas en la asignatura',
  })
  @ApiResponse({ type: ResponseSectionTeacherDto, isArray: true })
  findTeachers(
    @Param('periodId', ParseIntPipe) periodId: number,
    @Query() query: GetSectionTeachersDto,
  ) {
    return this.sectionTeacherService.findAll(periodId, query);
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseSectionDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseSectionDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionService.update(+id, updateSectionDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseSectionDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.remove(+id);
  }

  @Post('generate-report')
  @ApiResponse({
    description: 'Genera un reporte Excel de secciones académicas',
    type: ReportResponseDto,
  })
  async generateReport(
    @Body() reportParams: GenerateReportDto,
  ): Promise<ReportResponseDto> {
    return this.sectionService.generateReport(reportParams);
  }
}
