import { DataSource, EntityManager, Not, Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRepository } from '../../common/use-case';
import { Department } from '../department/entities';
import { User } from '../user/entities';
import { assertDepartmentScope } from '../user/permissions';
import { Roles } from '../user/enums/roles';
import {
  CreateDocumentDto,
  FindDocumentsQueryDto,
  ResponseDocumentDto,
  UpdateDocumentDto,
} from './dto';
import { DocumentE } from './entities';
import { TypeDocument } from './enum';

/** CRUD de formatos de documento, con un único formato activo por departamento y tipo. */
@Injectable()
export class DocumentService implements CrudRepository<DocumentE> {
  constructor(
    @InjectRepository(DocumentE)
    private repository: Repository<DocumentE>,
    private dataSource: DataSource,
  ) {}

  async findValid(id: number): Promise<DocumentE> {
    const item = await this.repository.findOne({
      where: { id, deleted: false },
      relations: ['department'],
    });
    if (!item) {
      throw new NotFoundException('Document not found');
    }
    return item;
  }

  findByName(
    name: string,
    departmentId: number,
    id?: number,
  ): Promise<DocumentE> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        department: { id: departmentId },
        deleted: false,
      },
    });
  }

  /** Formato activo de un departamento y tipo; 404 si no hay (el frontend usa el texto por defecto). */
  async findActive(
    departmentId: number,
    type: TypeDocument,
  ): Promise<ResponseDocumentDto> {
    const item = await this.repository.findOne({
      where: {
        department: { id: departmentId },
        type,
        status: true,
        deleted: false,
      },
      relations: ['department'],
    });
    if (!item) {
      throw new NotFoundException('Document not found');
    }
    return new ResponseDocumentDto(item);
  }

  /** Lista formatos; un jefe de departamento solo ve los de su departamento. */
  async findAll(
    user: User,
    query: FindDocumentsQueryDto,
  ): Promise<ResponseDocumentDto[]> {
    const departmentId =
      user.role === Roles.HeadDepartment
        ? (user.department?.id ?? 0)
        : query.departmentId && +query.departmentId;
    const items = await this.repository.find({
      where: {
        deleted: false,
        type: query.type,
        department: departmentId ? { id: departmentId } : undefined,
      },
      relations: ['department'],
      order: { name: 'ASC' },
    });
    return items.map((item) => new ResponseDocumentDto(item));
  }

  async findOne(id: number): Promise<ResponseDocumentDto> {
    return new ResponseDocumentDto(await this.findValid(id));
  }

  async create(
    user: User,
    createDto: CreateDocumentDto,
  ): Promise<ResponseDocumentDto> {
    assertDepartmentScope(user, createDto.department.id);
    const item = await this.saveValidated({
      ...createDto,
      status: createDto.status ?? true,
    } as DocumentE);
    return this.findOne(item.id);
  }

  /** Aplica sobre el documento guardado solo los campos recibidos. */
  async update(
    user: User,
    id: number,
    updateDto: UpdateDocumentDto,
  ): Promise<ResponseDocumentDto> {
    const item = await this.findValid(id);
    assertDepartmentScope(user, item.department.id);
    if (updateDto.department) {
      assertDepartmentScope(user, updateDto.department.id);
    }
    await this.saveValidated({ ...item, ...updateDto } as DocumentE);
    return this.findOne(id);
  }

  async remove(user: User, id: number): Promise<ResponseDocumentDto> {
    const item = await this.findValid(id);
    assertDepartmentScope(user, item.department.id);
    item.deleted = true;
    return new ResponseDocumentDto(await this.repository.save(item));
  }

  /**
   * Valida `{tabla}`, que el departamento exista y el nombre único, y guarda. Si queda activo, desactiva en la
   * misma transacción los demás formatos del mismo departamento y tipo.
   */
  private async saveValidated(doc: DocumentE): Promise<DocumentE> {
    if (
      doc.type === TypeDocument.AcademicCharge &&
      !doc.body.includes('{tabla}')
    ) {
      throw new BadRequestException('Body must contain {tabla}.');
    }
    const departmentExists = await this.dataSource
      .getRepository(Department)
      .exist({ where: { id: doc.department.id, deleted: false } });
    if (!departmentExists) {
      throw new BadRequestException('Department not found.');
    }
    if (await this.findByName(doc.name, doc.department.id, doc.id)) {
      throw new BadRequestException('Document already exists.');
    }
    return this.dataSource.transaction(async (manager: EntityManager) => {
      if (doc.status) {
        await manager.update(
          DocumentE,
          {
            id: Not(doc.id || 0),
            department: { id: doc.department.id },
            type: doc.type,
          },
          { status: false },
        );
      }
      return manager.save(DocumentE, doc);
    });
  }
}
