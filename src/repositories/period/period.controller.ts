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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '../../auth/login';
import { ResponsePeriodDto } from './dto';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { StagePeriod } from './enum';
import { PeriodService } from './period.service';

@ApiTags('period')
@Controller('period')
export class PeriodController {
  constructor(private readonly periodService: PeriodService) {}

  @Post()
  @ApiResponse({
    type: ResponsePeriodDto,
  })
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodService.create(createPeriodDto);
  }

  @Get()
  @ApiResponse({
    type: ResponsePeriodDto,
    isArray: true,
  })
  findAll() {
    return this.periodService.findAll();
  }

  @Public()
  @Get('active')
  @ApiOperation({ summary: 'Obtiene el período académico activo' })
  @ApiResponse({
    type: ResponsePeriodDto,
  })
  findActive() {
    return this.periodService.findPeriodActive();
  }

  @Get('to-plan')
  @ApiResponse({
    type: ResponsePeriodDto,
  })
  findToPlan() {
    return this.periodService.findByStage([
      StagePeriod.toStart,
      StagePeriod.toPlan,
    ]);
  }

  @Get(':id')
  @ApiResponse({
    type: ResponsePeriodDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.periodService.findOne(+id);
  }

  /**
   * Define el período académico activo. Desactiva cualquier otro que estuviera activo.
   */
  @Patch(':id/activate')
  @ApiOperation({
    summary: 'Define el período académico activo',
    description:
      'Marca el período indicado como activo y desactiva el resto. Solo puede haber un período activo.',
  })
  @ApiResponse({ type: ResponsePeriodDto })
  setActive(@Param('id', ParseIntPipe) id: number) {
    return this.periodService.setActive(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponsePeriodDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePeriodDto: UpdatePeriodDto,
  ) {
    return this.periodService.update(+id, updatePeriodDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponsePeriodDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.periodService.remove(+id);
  }
}
