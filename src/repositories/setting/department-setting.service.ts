import { DataSource, In, Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { stripAccents } from '../../common/text';
import { Department } from '../department/entities';
import { User } from '../user/entities';
import { assertDepartmentScope } from '../user/permissions';
import {
  ReserveOfficeNumbersDto,
  ResponseDepartmentSettingDto,
  ResponseOfficeNumbersDto,
  UpdateDepartmentSettingDto,
} from './dto';
import { DepartmentSetting } from './entities';

const currentYear = (): number => new Date().getFullYear();

/** Correlativo de oficios por departamento. Único punto que asigna números. */
@Injectable()
export class DepartmentSettingService {
  constructor(
    @InjectRepository(DepartmentSetting)
    private repository: Repository<DepartmentSetting>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    private dataSource: DataSource,
  ) {}

  /** Todos los departamentos con su correlativo; crea las filas que falten. */
  async findAll(): Promise<ResponseDepartmentSettingDto[]> {
    const departments = await this.departmentRepository.find({
      where: { deleted: false },
      order: { name: 'ASC' },
    });
    await this.createMissing(departments);
    const items = await this.repository.find({
      where: { departmentId: In(departments.map((d) => d.id)) },
      relations: ['department'],
      order: { department: { name: 'ASC' } },
    });
    return items.map((i) => new ResponseDepartmentSettingDto(i, currentYear()));
  }

  async findOne(departmentId: number): Promise<ResponseDepartmentSettingDto> {
    return new ResponseDepartmentSettingDto(
      await this.findOrCreate(departmentId),
      currentYear(),
    );
  }

  /** Solo Administrador o el jefe de ese departamento. Fijar el último número lo ubica en el año en curso. */
  async update(
    user: User,
    departmentId: number,
    updateDto: UpdateDepartmentSettingDto,
  ): Promise<ResponseDepartmentSettingDto> {
    assertDepartmentScope(user, departmentId);
    const item = await this.findOrCreate(departmentId);
    if (item.officeYear !== currentYear()) {
      Object.assign(item, { officeYear: currentYear(), officeLastNumber: 0 });
    }
    const saved = await this.repository.save({ ...item, ...updateDto });
    return new ResponseDepartmentSettingDto(saved, currentYear());
  }

  /**
   * Reserva `count` números con bloqueo de fila, así nunca se repiten aunque
   * se generen cartas a la vez. Con `start` usa start…start+count-1.
   * Solo Administrador o el jefe del departamento.
   * @throws BadRequestException si `start` no supera el último número emitido.
   * @throws BadRequestException si `year` es anterior al último año emitido
   * (repetiría números del año en curso) o posterior al año actual (bloquearía
   * el año en curso).
   */
  async reserve(
    user: User,
    departmentId: number,
    dto: ReserveOfficeNumbersDto,
  ): Promise<ResponseOfficeNumbersDto> {
    assertDepartmentScope(user, departmentId);
    await this.findOrCreate(departmentId);
    return this.dataSource.transaction(async (manager) => {
      const item = await manager.findOne(DepartmentSetting, {
        where: { departmentId },
        lock: { mode: 'pessimistic_write' },
      });
      if (dto.year < item.officeYear || dto.year > currentYear()) {
        throw new BadRequestException(
          'year must be between the last issued year and the current year.',
        );
      }
      const last = item.officeYear === dto.year ? item.officeLastNumber : 0;
      // Un inicio menor o igual al último emitido repetiría números.
      if (dto.start !== undefined && dto.start <= last) {
        throw new BadRequestException(
          `start must be greater than the last issued number (${last}).`,
        );
      }
      const first = dto.start ?? last + 1;
      const numbers = Array.from({ length: dto.count }, (_, i) => first + i);
      item.officeYear = dto.year;
      item.officeLastNumber = Math.max(last, numbers[numbers.length - 1]);
      await manager.save(item);
      const prefix = item.officePrefix;
      const codes = numbers.map(
        (n) => `${prefix}-${String(n).padStart(3, '0')}/${dto.year}`,
      );
      return { prefix, year: dto.year, numbers, codes };
    });
  }

  /** Fila del departamento, creada con valores por defecto si no existe. */
  private async findOrCreate(departmentId: number): Promise<DepartmentSetting> {
    const department = await this.departmentRepository.findOne({
      where: { id: departmentId, deleted: false },
    });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    await this.createMissing([department]);
    return this.repository.findOne({
      where: { departmentId },
      relations: ['department'],
    });
  }

  /** Crea filas por defecto (prefijo = siglas del departamento) para los que no tengan. */
  private async createMissing(departments: Department[]): Promise<void> {
    const existing = await this.repository.find({
      where: { departmentId: In(departments.map((d) => d.id)) },
    });
    const have = new Set(existing.map((e) => e.departmentId));
    const missing = departments.filter((d) => !have.has(d.id));
    if (!missing.length) {
      return;
    }
    await this.repository
      .createQueryBuilder()
      .insert()
      .values(
        missing.map((d) => ({
          departmentId: d.id,
          officePrefix: toPrefix(d.abbreviation),
          officeYear: currentYear(),
        })),
      )
      .orIgnore()
      .execute();
  }
}

/** Siglas del departamento normalizadas a `^[A-Z0-9]{1,10}$`. */
function toPrefix(abbreviation: string): string {
  const prefix = stripAccents(abbreviation || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 10);
  return prefix || 'OF';
}
