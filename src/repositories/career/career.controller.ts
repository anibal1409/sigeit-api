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
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Public } from '../../auth/login/login.guard';
import { CareerService } from './career.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { ResponseCareerDto } from './dto/response-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';

@ApiTags('career')
@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
  @ApiResponse({
    type: ResponseCareerDto,
  })
  create(@Body() createCareerDto: CreateCareerDto) {
    return this.careerService.create(createCareerDto);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: ResponseCareerDto,
    isArray: true,
  })
  findAll() {
    return this.careerService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseCareerDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.careerService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseCareerDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCareerDto: UpdateCareerDto,
  ) {
    return this.careerService.update(+id, updateCareerDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseCareerDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.careerService.remove(+id);
  }
}
