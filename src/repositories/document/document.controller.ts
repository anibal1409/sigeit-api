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

import { strictValidation } from '../../common/validation';
import { User } from '../user/entities';
import { CurrentUser } from '../user/permissions';
import { DocumentService } from './document.service';
import {
  ActiveDocumentQueryDto,
  CreateDocumentDto,
  FindDocumentsQueryDto,
  ResponseDocumentDto,
  UpdateDocumentDto,
} from './dto';
import { AllowRoles } from '../../auth/roles';
import { Roles } from '../user/enums';

/** Formatos de documento por departamento. Escritura: Administrador o jefe del departamento. */
@ApiTags('document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @AllowRoles(Roles.Administrator, Roles.HeadDepartment)
  @ApiOperation({ summary: 'Crear formato' })
  @ApiResponse({ type: ResponseDocumentDto })
  @ApiBadRequestResponse({ description: 'Nombre repetido o falta {tabla}' })
  @ApiForbiddenResponse({ description: 'Sin permiso sobre el departamento' })
  create(
    @CurrentUser() user: User,
    @Body(strictValidation) createDocumentDto: CreateDocumentDto,
  ) {
    return this.documentService.create(user, createDocumentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar formatos',
    description: 'Un jefe de departamento solo ve los de su departamento.',
  })
  @ApiResponse({ type: ResponseDocumentDto, isArray: true })
  findAll(
    @CurrentUser() user: User,
    @Query(strictValidation) query: FindDocumentsQueryDto,
  ) {
    return this.documentService.findAll(user, query);
  }

  @Get('active')
  @ApiOperation({ summary: 'Formato activo de un departamento y tipo' })
  @ApiResponse({ type: ResponseDocumentDto })
  @ApiNotFoundResponse({ description: 'No hay formato activo' })
  findActive(@Query(strictValidation) query: ActiveDocumentQueryDto) {
    return this.documentService.findActive(+query.departmentId, query.type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener formato' })
  @ApiResponse({ type: ResponseDocumentDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.findOne(id);
  }

  @Patch(':id')
  @AllowRoles(Roles.Administrator, Roles.HeadDepartment)
  @ApiOperation({ summary: 'Actualizar formato (solo los campos enviados)' })
  @ApiResponse({ type: ResponseDocumentDto })
  @ApiBadRequestResponse({ description: 'Nombre repetido o falta {tabla}' })
  @ApiForbiddenResponse({ description: 'Sin permiso sobre el departamento' })
  update(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body(strictValidation) updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update(user, id, updateDocumentDto);
  }

  @Delete(':id')
  @AllowRoles(Roles.Administrator, Roles.HeadDepartment)
  @ApiOperation({ summary: 'Eliminar formato' })
  @ApiResponse({ type: ResponseDocumentDto })
  @ApiForbiddenResponse({ description: 'Sin permiso sobre el departamento' })
  remove(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.documentService.remove(user, id);
  }
}
