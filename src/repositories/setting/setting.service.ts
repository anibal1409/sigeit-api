import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { School } from '../school/entities';
import { assertAdmin } from '../user/permissions';
import { UserService } from '../user/user.service';
import { ResponseSettingDto, UpdateSettingDto } from './dto';
import { Setting } from './entities';

/** Lectura y actualización de la configuración única del instituto. */
@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private repository: Repository<Setting>,
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
    private userService: UserService,
  ) {}

  /** Devuelve la única fila; si no existe, la crea con valores por defecto tomando nombre y siglas de la primera escuela. */
  private async findOrCreate(): Promise<Setting> {
    const item = await this.repository.findOne({
      where: {},
      order: { id: 'ASC' },
    });
    if (item) {
      return item;
    }
    const school = await this.schoolRepository.findOne({
      where: { deleted: false },
      order: { id: 'ASC' },
    });
    return this.repository.save({
      instituteName: school?.name?.slice(0, 100) || 'Instituto',
      instituteAbbreviation: school?.abbreviation?.slice(0, 20) || 'INST',
      startTime: '07:00',
      endTime: '18:00',
      duration: 45,
      interval: 5,
    });
  }

  /** Devuelve la configuración actual. */
  async find(): Promise<ResponseSettingDto> {
    return new ResponseSettingDto(await this.findOrCreate());
  }

  /**
   * Actualiza la configuración.
   * @throws ForbiddenException si el usuario no es Administrador.
   * @throws BadRequestException si endTime <= startTime (comparando con lo guardado).
   */
  async update(
    userId: number,
    updateDto: UpdateSettingDto,
  ): Promise<ResponseSettingDto> {
    assertAdmin(await this.userService.findValid(userId));
    const item = await this.findOrCreate();
    const merged = { ...item, ...updateDto };
    // HH:mm con cero a la izquierda: la comparación de texto equivale a la de horas.
    if (merged.endTime <= merged.startTime) {
      throw new BadRequestException('endTime must be after startTime.');
    }
    return new ResponseSettingDto(await this.repository.save(merged));
  }
}
