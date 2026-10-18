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
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUserId } from '../user/permissions';
import { DocumentService } from './document.service';
import {
  ActiveDocumentQueryDto,
  CreateDocumentDto,
  FindDocumentsQueryDto,
  ResponseDocumentDto,
  UpdateDocumentDto,
} from './dto';

/** Formatos de documento por departamento. Escritura: Administrador o jefe del departamento. */
@ApiTags('document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @ApiOperation({ summary: 'Crear formato' })
  @ApiResponse({ type: ResponseDocumentDto })
  @ApiBadRequestResponse({ description: 'Nombre repetido o falta {tabla}' })
  @ApiForbiddenResponse({ description: 'Sin permiso sobre el departamento' })
  create(
    @CurrentUserId() userId: number,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    return this.documentService.create(userId, createDocumentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar formatos',
    description: 'Un jefe de departamento solo ve los de su departamento.',
  })
  @ApiResponse({ type: ResponseDocumentDto, isArray: true })
  findAll(
    @CurrentUserId() userId: number,
    @Query() query: FindDocumentsQueryDto,
  ) {
    return this.documentService.findAll(userId, query);
  }

  @Get('active')
  @ApiOperation({ summary: 'Formato activo de un departamento y tipo' })
  @ApiResponse({ type: ResponseDocumentDto })
  @ApiNotFoundResponse({ description: 'No hay formato activo' })
  findActive(@Query() query: ActiveDocumentQueryDto) {
    return this.documentService.findActive(+query.departmentId, query.type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener formato' })
  @ApiResponse({ type: ResponseDocumentDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar formato (solo los campos enviados)' })
  @ApiResponse({ type: ResponseDocumentDto })
  @ApiBadRequestResponse({ description: 'Nombre repetido o falta {tabla}' })
  @ApiForbiddenResponse({ description: 'Sin permiso sobre el departamento' })
  update(
    @CurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update(userId, id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar formato' })
  @ApiResponse({ type: ResponseDocumentDto })
  @ApiForbiddenResponse({ description: 'Sin permiso sobre el departamento' })
  remove(
    @CurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.documentService.remove(userId, id);
  }
}
