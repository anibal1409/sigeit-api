import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// eslint-disable-next-line prettier/prettier
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  GetSubjectDemandDto,
  ImportSubjectDemandResultDto,
  ResponseSubjectDemandDto,
} from './dto';
import { UploadedDemandFile } from './subject-demand.parser';
import { SubjectDemandService } from './subject-demand.service';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

@ApiTags('subject-demand')
@Controller('subject-demand')
export class SubjectDemandController {
  constructor(private readonly subjectDemandService: SubjectDemandService) {}

  @Post('import/period/:periodId')
  @ApiOperation({
    summary:
      'Importar reporte de demanda (.xlsx/.csv/.tsv con columnas CODIGO, NIVEL, CANTIDAD); reemplaza la demanda del período',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiResponse({ type: ImportSubjectDemandResultDto })
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_FILE_SIZE } }),
  )
  import(
    @Param('periodId', ParseIntPipe) periodId: number,
    @UploadedFile() file: UploadedDemandFile,
  ) {
    if (!file) {
      throw new BadRequestException('Debe adjuntar el archivo en "file".');
    }
    return this.subjectDemandService.import(periodId, file);
  }

  @Get('period/:periodId')
  @ApiOperation({ summary: 'Demanda por asignatura y nivel de un período' })
  @ApiResponse({ type: ResponseSubjectDemandDto, isArray: true })
  findAllPeriod(
    @Param('periodId', ParseIntPipe) periodId: number,
    @Query() query: GetSubjectDemandDto,
  ) {
    return this.subjectDemandService.findAllPeriod(periodId, query);
  }
}
