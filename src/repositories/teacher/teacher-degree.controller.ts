import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateTeacherDegreeDto,
  ResponseTeacherDegreeDto,
  ResponseTeacherGradeSearchDto,
  SearchTeacherGradeDto,
  TranscriptPreviewDto,
  UpdateTeacherDegreeDto,
} from './dto';
import {
  FILE_UPLOAD_BODY,
  MAX_UPLOAD_SIZE,
  UploadedFileData,
} from '../../common/upload';
import { TeacherDegreeService } from './teacher-degree.service';

/** Títulos académicos de los profesores y las notas de sus asignaturas. */
@ApiTags('teacher-degree')
@Controller('teacher-degree')
export class TeacherDegreeController {
  constructor(private readonly teacherDegreeService: TeacherDegreeService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un título con sus notas' })
  @ApiResponse({ type: ResponseTeacherDegreeDto })
  create(@Body() dto: CreateTeacherDegreeDto) {
    return this.teacherDegreeService.create(dto);
  }

  @Post('parse-transcript')
  @ApiOperation({
    summary:
      'Extraer las notas de un récord sin guardarlas, para revisarlas antes de registrar el título',
    description:
      'Acepta PDF, JPG, PNG, WEBP o HEIC (máx. 5 MB). Los PDF con texto en formato UDO se leen localmente; imágenes, PDF escaneados y otros formatos se leen con Gemini (requiere GEMINI_API_KEY; responde 503 si no está configurada o falla).',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody(FILE_UPLOAD_BODY)
  @ApiResponse({ type: TranscriptPreviewDto })
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_UPLOAD_SIZE } }),
  )
  parseTranscript(@UploadedFile() file: UploadedFileData) {
    if (!file) {
      throw new BadRequestException('Debe adjuntar el archivo en "file".');
    }
    return this.teacherDegreeService.parseTranscript(file);
  }

  @Get('search')
  @ApiOperation({
    summary: 'Buscar profesores con nota en una asignatura (o similar)',
  })
  @ApiResponse({ type: ResponseTeacherGradeSearchDto, isArray: true })
  search(@Query() query: SearchTeacherGradeDto) {
    return this.teacherDegreeService.searchByGrade(query);
  }

  @Get('teacher/:teacherId')
  @ApiOperation({ summary: 'Títulos de un profesor con sus notas' })
  @ApiResponse({ type: ResponseTeacherDegreeDto, isArray: true })
  findAllTeacher(@Param('teacherId', ParseIntPipe) teacherId: number) {
    return this.teacherDegreeService.findAllTeacher(teacherId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un título con sus notas' })
  @ApiResponse({ type: ResponseTeacherDegreeDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teacherDegreeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un título; si envía grades, reemplaza todas sus notas',
  })
  @ApiResponse({ type: ResponseTeacherDegreeDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTeacherDegreeDto,
  ) {
    return this.teacherDegreeService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un título y sus notas (eliminación lógica)',
  })
  @ApiResponse({ type: ResponseTeacherDegreeDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teacherDegreeService.remove(id);
  }
}
