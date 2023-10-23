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
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Public } from '../../auth/login/login.guard';
import {
  CloseInscriptionDto,
  CreateInscriptionDto,
  GetInscriptionDto,
  ResponseInscriptionDto,
  UpdateInscriptionDto,
} from './dto';
import { InscriptionService } from './inscription.service';

@ApiTags('inscription')
@Controller('inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}

  @Post()
  @ApiResponse({
    type: ResponseInscriptionDto,
  })
  create(@Body() createSubjectDto: CreateInscriptionDto) {
    return this.inscriptionService.create(createSubjectDto);
  }

  @Post('/close')
  @ApiResponse({
    type: ResponseInscriptionDto,
  })
  close(@Body() closeInscriptionDto: CloseInscriptionDto) {
    return this.inscriptionService.close(closeInscriptionDto);
  }

  @Public()
  @Get('/period/:id')
  @ApiResponse({
    type: ResponseInscriptionDto,
    isArray: true,
  })
  findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() data: GetInscriptionDto,
  ) {
    return this.inscriptionService.findAll(id, data);
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseInscriptionDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inscriptionService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseInscriptionDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubjectDto: UpdateInscriptionDto,
  ) {
    return this.inscriptionService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseInscriptionDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inscriptionService.remove(+id);
  }
}
