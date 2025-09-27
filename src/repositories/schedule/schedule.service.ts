// eslint-disable-next-line prettier/prettier
import {
  MoreThan,
  Not,
  Repository,
} from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ExcelJS from 'exceljs';

import { CrudRepository } from '../../common/use-case';
import {
  CreateScheduleDto,
  DownloadPlannedSchedulesDto,
  GetSchedulesDto,
  ResponseScheduleDto,
  UpdateScheduleDto,
} from './dto';
import { Schedule } from './entities';

@Injectable()
export class ScheduleService implements CrudRepository<Schedule> {
  constructor(
    @InjectRepository(Schedule)
    private repository: Repository<Schedule>,
  ) {}

  async findValid(id: number): Promise<Schedule> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: ['day', 'period', 'classroom', 'section', 'section.subject'],
    });
    if (!item) {
      throw new NotFoundException('Schedule not found');
    }
    return item;
  }

  findBySchedule(
    start: string,
    end: string,
    classroomId: number,
    sectionId: number,
    dayId: number,
    periodId: number,
    id?: number,
  ): Promise<Schedule> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        period: {
          id: periodId,
        },
        day: {
          id: dayId,
        },
        classroom: {
          id: classroomId,
        },
        section: {
          id: sectionId,
        },
        start,
        end,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateScheduleDto): Promise<ResponseScheduleDto> {
    if (
      await this.findBySchedule(
        createDto.start,
        createDto.end,
        createDto.classroom.id,
        createDto.section.id,
        createDto.day.id,
        createDto.period.id,
      )
    ) {
      throw new BadRequestException('Schedule already exists.');
    }

    const item = await this.repository.save(createDto);
    return await this.findOne(item.id);
  }

  findAllPeriod(periodId: number, query?: GetSchedulesDto, students = false) {
    return this.repository.find({
      where: {
        deleted: false,
        status: query?.status || null,
        period: {
          id: periodId,
        },
        section: {
          id: query?.sectionId || Not(0),
          status: students || null,
          capacity: students ? MoreThan(0) : null,
          subject: {
            id: query?.subjectId || Not(0),
            semester: query?.semester || Not(0),
            department: {
              id: query?.departmentId || Not(0),
            },
            status: students || null,
          },
          teacher: {
            id: query?.teacherId || Not(0),
          },
        },
        classroom: {
          id: query?.classroomId || Not(0),
        },
        day: {
          id: query?.dayId || Not(0),
        },
      },
      relations: [
        'classroom',
        'day',
        'period',
        'section',
        'section.subject',
        'section.teacher',
      ],
      order: {
        section: {
          subject: {
            semester: 'ASC',
            name: 'ASC',
          },
          name: 'ASC',
        },
        day: {
          id: 'ASC',
        },
        start: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ResponseScheduleDto> {
    const item = await this.findValid(id);
    return new ResponseScheduleDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateScheduleDto,
  ): Promise<ResponseScheduleDto> {
    if (
      await this.findBySchedule(
        updateDto.start,
        updateDto.end,
        updateDto.classroom.id,
        updateDto.section.id,
        updateDto.day.id,
        updateDto.period.id,
        id,
      )
    ) {
      throw new BadRequestException('Schedule already exists.');
    }
    const item = await this.repository.save({
      id,
      status: updateDto.status,
      period: updateDto.period,
      start: updateDto.start,
      end: updateDto.end,
      classroom: updateDto.classroom,
      section: updateDto.section,
      day: updateDto.day,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseScheduleDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ResponseScheduleDto(await this.repository.save(item));
  }

  createMany(createDto: Array<CreateScheduleDto>): Promise<Schedule[]> {
    return this.repository.save(createDto);
  }

  async downloadPlannedSchedules(dto: DownloadPlannedSchedulesDto): Promise<Buffer> {
    const schedules = await this.findAllPeriod(dto.periodId, {
      departmentId: dto.departmentId,
      status: dto.status !== undefined ? dto.status === 1 : true,
    });

    // Agrupar datos por el campo especificado
    const groupedData = this.groupSchedules(schedules, dto.groupBy || 'semester');

    // Crear workbook de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Horarios');

    let rowCount = 2;

    // Obtener información del departamento y período
    const department = schedules[0]?.section?.subject?.department;
    const period = schedules[0]?.period;

    // Título principal
    worksheet.mergeCells(`B${rowCount}:K${rowCount}`);
    worksheet.getCell(`B${rowCount}`).value = `PLANIFICACION ACADEMICA ${department?.abbreviation}-${period?.name}`;
    worksheet.getCell(`B${rowCount}`).font = { bold: true, size: 14 };
    worksheet.getCell(`B${rowCount}`).alignment = { horizontal: 'center' };
    rowCount += 2;

    // Procesar cada grupo
    Object.keys(groupedData).forEach((groupKey) => {
      const groupText = dto.groupBy === 'teacherName' ? 'Profesor' : 'Semestre';

      // Calcular horas totales si es por profesor
      let groupTitle = `${groupText} ${groupKey}`;
      if (dto.groupBy === 'teacherName') {
        const totalHours = this.calculateTeacherTotalHoursFromSchedules(groupedData[groupKey]);
        groupTitle = `${groupText} ${groupKey} (${totalHours})`;
      }

      // Título del grupo
      worksheet.mergeCells(`B${rowCount}:K${rowCount}`);
      worksheet.getCell(`B${rowCount}`).value = groupTitle;
      worksheet.getCell(`B${rowCount}`).font = { bold: true };
      rowCount++;

      // Encabezados de columnas
      const headers = [
        'Código',
        'Asignatura',
        'Sección',
        'Día',
        'Aula',
        'Desde',
        'Hasta',
        'Profesor',
        'Nombre',
        'Capacidad',
      ];

      headers.forEach((header, index) => {
        const cell = worksheet.getCell(rowCount, index + 2);
        cell.value = header;
        cell.font = { bold: true };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFE0E0E0' },
        };
      });
      rowCount++;

      // Datos del grupo
      groupedData[groupKey].forEach((schedule: any) => {
        const rowData = [
          schedule.section?.subject?.code || '',
          schedule.section?.subject?.name || '',
          schedule.section?.name || '',
          schedule.day?.name || '',
          schedule.classroom?.name || '',
          schedule.start || '',
          schedule.end || '',
          schedule.section?.teacher?.idDocument || '',
          schedule.section?.teacher ? `${schedule.section.teacher.firstName} ${schedule.section.teacher.lastName}` : '',
          schedule.section?.capacity || '',
        ];

        rowData.forEach((value, index) => {
          worksheet.getCell(rowCount, index + 2).value = value;
        });
        rowCount++;
      });

      rowCount += 1; // Espacio entre grupos
    });

    // Ajustar ancho de columnas
    worksheet.columns.forEach((column, index) => {
      if (index >= 1 && index <= 11) {
        column.width = 15;
      }
    });

    // Generar buffer del archivo
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  private groupSchedules(schedules: Schedule[], groupBy: string): Record<string, Schedule[]> {
    const grouped: Record<string, Schedule[]> = {};

    schedules.forEach((schedule) => {
      let groupKey: string;

      if (groupBy === 'teacherName') {
        groupKey = schedule.section?.teacher ? `${schedule.section.teacher.firstName} ${schedule.section.teacher.lastName}` : 'Sin profesor';
      } else {
        groupKey = schedule.section?.subject?.semester?.toString() || 'Sin semestre';
      }

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(schedule);
    });

    return grouped;
  }

  private calculateTeacherTotalHoursFromSchedules(schedules: Schedule[]): number {
    // Obtener secciones únicas para evitar duplicar horas
    const uniqueSections = new Map();
    schedules.forEach(schedule => {
      if (schedule.section?.id) {
        uniqueSections.set(schedule.section.id, schedule.section);
      }
    });

    // Sumar las horas de las secciones únicas
    return Array.from(uniqueSections.values()).reduce((totalHours, section) => {
      return totalHours + (section.subject?.hours || 0);
    }, 0);
  }
}
