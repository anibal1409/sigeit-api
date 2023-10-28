import {
  DeleteResult,
  Not,
  Repository,
} from 'typeorm';

import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRepository } from '../../common';
import { ScheduleService } from '../schedule';
import { ResponseSectionDto } from '../section';
import { SectionService } from '../section/section.service';
import {
  CloseInscriptionDto,
  CreateInscriptionDto,
  GetInscriptionDto,
  ResponseInscriptionDto,
  UpdateInscriptionDto,
} from './dto';
import { Inscription } from './entities';
import { StageInscription } from './enums';

@Injectable()
export class InscriptionService implements CrudRepository<Inscription> {

  constructor(
    @InjectRepository(Inscription)
    private repository: Repository<Inscription>,
    @Inject(forwardRef(() => SectionService))
    private readonly sectionService: SectionService,
    @Inject(forwardRef(() => ScheduleService))
    private readonly scheduleService: ScheduleService,
  ) {}

  async findValid(id: number): Promise<Inscription> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: ['section', 'user'],
    });
    if (!item) {
      throw new NotFoundException('Inscription not found');
    }
    return item;
  }

  findUserSection(
    userId: number,
    sectionId: number,
    id?: number,
  ): Promise<Inscription> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        section: {
          id: sectionId,
        },
        user: {
          id: userId,
        },
        deleted: false,
      },
    });
  }

  async create(
    createDto: CreateInscriptionDto,
  ): Promise<ResponseInscriptionDto> {
    const inscription = await this.findUserSection(
      createDto.user.id,
      createDto.section.id,
    );
    if (inscription && inscription.stage === createDto.stage) {
      throw new BadRequestException('Inscription already exists.');
    }
    const section = await this.sectionService.findOne(createDto.section.id);
    this.validateSection(section);

    const item = await this.repository.save(createDto);
    section.inscribed += 1;
    await this.sectionService.update(section.id, section);

    return await this.findOne(item.id);
  }

  async findAll(periodId: number, data: GetInscriptionDto) {
    const inscriptions = await this.repository.find({
      where: {
        deleted: false,
        status: data.status,
        stage: data?.stage || null,
        user: {
          id: data?.userId || Not(0),
        },
        section: {
          id: data?.sectionId || Not(0),
          period: {
            id: periodId,
          },
          teacher: {
            id: data?.teacherId || Not(0),
          },
          subject: {
            id: data?.subjectId || Not(0),
            semester: data?.semester || Not(0),
            careers: {
              id: data?.careerId || Not(0),
            },
            department: {
              id: data?.departmentId || Not(0),
              school: {
                id: data?.schoolId || Not(0),
              },
            },
          },
        },
      },
      relations: ['section', 'user', 'section.subject', 'section.teacher'],
      order: {
        section: {
          subject: {
            name: 'ASC',
          },
        },
      },
    });

    if (data?.schedules && inscriptions.length) {
      // Crear una matriz de promesas para las consultas de "schedules"
      const schedulePromises = inscriptions.map(async (inscription) => {
        return this.scheduleService.findAllPeriod(periodId, {
          sectionId: inscription.section.id,
        });
      });

      // Esperar a que todas las consultas de "schedules" se completen
      const schedulesResults = await Promise.all(schedulePromises);

      // Asignar los resultados de "schedules" a las inscripciones
      inscriptions.forEach((inscription, index) => {
        inscription.section = {
          schedules: schedulesResults[index],
          ...inscription.section,
        } as any;
      });
    }

    return inscriptions;
  }

  async findOne(id: number): Promise<ResponseInscriptionDto> {
    const item = await this.findValid(id);
    return new ResponseInscriptionDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateInscriptionDto,
  ): Promise<ResponseInscriptionDto> {
    const inscription = await this.findUserSection(
      updateDto.user?.id,
      updateDto.section.id,
      id,
    );
    if (inscription && inscription.stage === updateDto.stage) {
      throw new BadRequestException('Inscription already exists.');
    }
    if (inscription.section.id !== updateDto.section.id) {
      const section = await this.sectionService.findOne(updateDto.section.id);
      this.validateSection(section);
      section.inscribed += 1;
      await this.sectionService.update(section.id, section);

      const lastSection = await this.sectionService.findOne(
        inscription.section.id,
      );
      lastSection.inscribed -= 1;
      await this.sectionService.update(lastSection.id, lastSection);
    }

    const item = await this.repository.save({
      id,
      section: updateDto.section,
      user: updateDto.user,
      stage: updateDto.stage,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseInscriptionDto | DeleteResult> {
    const item = await this.findValid(id);

    const section = await this.sectionService.findOne(item.section.id);
    section.capacity += 1;
    let res;
    if (item.stage === StageInscription.Validated) {
      res = this.repository.delete(id);
    } else {
      item.deleted = true;
      res = new ResponseInscriptionDto(await this.repository.save(item));
    }
    await this.sectionService.update(section.id, section);

    return res;
  }

  close(closeInscriptionDto: CloseInscriptionDto) {
    const inscriptions = closeInscriptionDto.ids.map((id) => ({
      id,
      stage: StageInscription.Registered,
    }));
    return this.repository.save(inscriptions);
  }

  private validateSection(section: ResponseSectionDto) {
    if (section.inscribed >= section.capacity) {
      throw new BadRequestException('Sección sin capacidad.');
    }
  }
}
