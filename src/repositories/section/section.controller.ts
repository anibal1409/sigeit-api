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

import {
  GetSectionsDto,
  ResponseSectionDto,
} from './dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { SectionService } from './section.service';

@ApiTags('section')
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @ApiResponse({
    type: ResponseSectionDto,
  })
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @Get('/department/:departmentId/period/:periodId')
  @ApiResponse({
    type: ResponseSectionDto,
    isArray: true,
  })
  findAll(
    @Param('departmentId', ParseIntPipe) departmentId: number,
    @Param('periodId', ParseIntPipe) periodId: number,
    @Query() data: GetSectionsDto,
  ) {
    return this.sectionService.findAllPeriod(+departmentId, +periodId, data);
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
}
