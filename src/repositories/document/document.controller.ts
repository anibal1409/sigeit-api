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

import { DocumentService } from './document.service';
import {
  CreateDocumentDto,
  ResponseDocumentDto,
} from './dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@ApiTags('document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @ApiResponse({
    type: ResponseDocumentDto,
  })
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  @ApiResponse({
    type: ResponseDocumentDto,
    isArray: true,
  })
  findAll() {
    return this.documentService.findAll();
  }

  @Get('active')
  @ApiResponse({
    type: ResponseDocumentDto,
  })
  findActive() {
    return this.documentService.findActive();
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseDocumentDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseDocumentDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update(+id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseDocumentDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.remove(+id);
  }

}
