import { Not, Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRepository } from '../../common/use-case';
import { InscriptionService } from '../inscription/inscription.service';
import { ScheduleService } from '../schedule/schedule.service';
import {
  CreateSectionDto,
  GenerateReportDto,
  GetSectionsDto,
  ReportResponseDto,
  ResponseSectionDto,
  UpdateSectionDto,
} from './dto';
import { Section } from './entities';

@Injectable()
export class SectionService implements CrudRepository<Section> {
  constructor(
    @InjectRepository(Section)
    private repository: Repository<Section>,
    private readonly scheduleService: ScheduleService,
    private readonly inscriptionService: InscriptionService,
  ) {}

  async findValid(id: number): Promise<Section> {
    const item = await this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: ['teacher', 'period', 'subject', 'subject.department'],
    });
    if (!item) {
      throw new NotFoundException('Section not found');
    }
    return item;
  }

  findByName(
    name: string,
    subjectId: number,
    periodId: number,
    id?: number,
  ): Promise<Section> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        subject: {
          id: subjectId,
        },
        period: {
          id: periodId,
        },
        deleted: false,
      },
      relations: ['subject', 'period', 'teacher', 'subject.department'],
    });
  }

  async create(createDto: CreateSectionDto): Promise<ResponseSectionDto> {
    if (
      await this.findByName(
        createDto.name,
        createDto.subject.id,
        createDto.period.id,
      )
    ) {
      throw new BadRequestException('Section already exists.');
    }

    const item = await this.repository.save(createDto);
    return await this.findOne(item.id);
  }

  findAllOfPeriod(periodId: number, query?: GetSectionsDto) {
    return this.repository.find({
      where: {
        deleted: false,
        status: query?.status,
        period: {
          id: periodId,
        },
        subject: {
          id: query?.subjectId || Not(0),
          department: {
            id: query?.departmentId || Not(0),
          },
          semester: query?.semester || Not(0),
        },
        teacher: {
          id: query?.teacherId || Not(0),
        },
      },
      relations: ['subject', 'period', 'teacher', 'subject.department'],
      order: {
        subject: {
          semester: 'ASC',
          name: 'ASC',
        },
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ResponseSectionDto> {
    const item = await this.findValid(id);
    return new ResponseSectionDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateSectionDto,
  ): Promise<ResponseSectionDto> {
    if (
      await this.findByName(
        updateDto.name,
        updateDto.subject.id,
        updateDto.period.id,
        id,
      )
    ) {
      throw new BadRequestException('Section already exists.');
    }
    const item = await this.repository.save({
      id,
      name: updateDto.name,
      status: updateDto.status,
      capacity: updateDto.capacity,
      subject: updateDto.subject,
      period: updateDto.period,
      teacher: updateDto.teacher,
      all: updateDto?.all,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ResponseSectionDto> {
    const item = await this.findValid(id);

    // Eliminar en cascada todos los horarios relacionados
    const schedules = await this.scheduleService.findAllPeriod(item.period.id, {
      sectionId: item.id,
    });

    for (const schedule of schedules) {
      await this.scheduleService.remove(schedule.id);
    }

    // Eliminar en cascada todas las inscripciones relacionadas
    const inscriptions = await this.inscriptionService.findAll(item.period.id, {
      sectionId: item.id,
    });

    for (const inscription of inscriptions) {
      await this.inscriptionService.remove(inscription.id);
    }

    // Finalmente eliminar la sección
    item.deleted = true;
    return new ResponseSectionDto(await this.repository.save(item));
  }

  async generateReport(
    reportParams: GenerateReportDto,
  ): Promise<ReportResponseDto> {
    const {
      periodId,
      departmentId,
      groupBy = 'semester',
      semester,
      teacherId,
      status = true,
    } = reportParams;

    // Obtener las secciones con los filtros aplicados
    const sections = await this.findAllOfPeriod(periodId, {
      departmentId,
      semester,
      teacherId,
      status,
    });

    // Crear el workbook y worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Secciones');

    // Obtener información del departamento y período desde las relaciones de las secciones
    const department =
      sections.length > 0 ? sections[0].subject?.department : null;
    const period = sections.length > 0 ? sections[0].period : null;

    // Configurar el reporte
    await this.setupReportHeaders(worksheet, department, period);

    // Generar el contenido del reporte
    await this.generateReportContent(worksheet, sections, groupBy);

    // Aplicar estilos
    this.applyReportStyles(worksheet);

    // Generar el buffer del archivo
    const buffer = await workbook.xlsx.writeBuffer();

    // Crear y retornar el DTO de respuesta
    const response: ReportResponseDto = {
      buffer: buffer,
      filename: `reporte_secciones_${period?.name || 'periodo'}_${department?.abbreviation || 'dept'}_${new Date().toISOString().split('T')[0]}.xlsx`,
      contentType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      contentLength: (buffer as any).length || 0,
      generatedAt: new Date(),
      message: 'Reporte generado exitosamente',
    };

    return response;
  }

  private async setupReportHeaders(
    worksheet: ExcelJS.Worksheet,
    department: any,
    period: any,
  ): Promise<void> {
    // Título principal
    worksheet.mergeCells('B2:H2');
    const titleCell = worksheet.getCell('B2');
    titleCell.value = `SECCIONES ACADEMICAS ${department.abbreviation}-${period.name}`;
    titleCell.font = { bold: true, size: 16, color: { argb: 'FFFFFF' } };
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '4684FF' },
    };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // Información del departamento y período
    worksheet.mergeCells('B4:D4');
    worksheet.getCell('B4').value = `Departamento: ${department.name}`;
    worksheet.getCell('B4').font = {
      bold: true,
      size: 12,
      color: { argb: '4684FF' },
    };
    worksheet.getCell('B4').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'E3F2FD' },
    };

    worksheet.mergeCells('E4:G4');
    worksheet.getCell('E4').value = `Período: ${period.name}`;
    worksheet.getCell('E4').font = {
      bold: true,
      size: 12,
      color: { argb: '4684FF' },
    };
    worksheet.getCell('E4').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'E3F2FD' },
    };

    worksheet.mergeCells('H4:I4');
    worksheet.getCell('H4').value =
      `Fecha: ${new Date().toLocaleDateString('es-ES')}`;
    worksheet.getCell('H4').font = {
      bold: true,
      size: 12,
      color: { argb: '4684FF' },
    };
    worksheet.getCell('H4').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'E3F2FD' },
    };
  }

  private async generateReportContent(
    worksheet: ExcelJS.Worksheet,
    sections: any[],
    groupBy: string,
  ): Promise<void> {
    const currentRow = 6;

    if (groupBy === 'semester') {
      await this.generateSemesterGroupedReport(worksheet, sections, currentRow);
    } else if (groupBy === 'teacherName') {
      await this.generateTeacherGroupedReport(worksheet, sections, currentRow);
    }
  }

  private async generateSemesterGroupedReport(
    worksheet: ExcelJS.Worksheet,
    sections: any[],
    startRow: number,
  ): Promise<void> {
    let currentRow = startRow;

    // Agrupar por semestre
    const semesterGroups = this.groupBySemester(sections);

    for (const [semester, semesterSections] of Object.entries(semesterGroups)) {
      // Encabezado del semestre
      worksheet.mergeCells(`B${currentRow}:H${currentRow}`);
      const semesterHeader = worksheet.getCell(`B${currentRow}`);
      semesterHeader.value = `Semestre ${semester}`;
      semesterHeader.font = { bold: true, size: 14, color: { argb: 'FFFFFF' } };
      semesterHeader.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF6600' },
      };
      semesterHeader.alignment = { horizontal: 'center', vertical: 'middle' };
      currentRow++;

      // Headers de columnas
      const headers = [
        'CÓDIGO',
        'ASIGNATURA',
        'SEMESTRE',
        'SECCIÓN',
        'PROFESOR',
        'CAPACIDAD',
      ];
      worksheet.getRow(currentRow).values = ['', ...headers];
      this.styleColumnHeaders(worksheet, currentRow);
      currentRow++;

      // Datos del semestre
      for (const section of semesterSections) {
        const rowData = [
          '',
          section.subject?.code || '',
          section.subject?.name || '',
          section.subject?.semester || '',
          section.name || '',
          section.teacher
            ? `${section.teacher.firstName} ${section.teacher.lastName}`
            : '',
          section.capacity || 0,
        ];
        worksheet.getRow(currentRow).values = rowData;
        currentRow++;
      }

      currentRow += 2; // Espacio entre grupos
    }
  }

  private async generateTeacherGroupedReport(
    worksheet: ExcelJS.Worksheet,
    sections: any[],
    startRow: number,
  ): Promise<void> {
    let currentRow = startRow;

    // Agrupar por profesor
    const teacherGroups = this.groupByTeacher(sections);

    for (const [teacherName, teacherSections] of Object.entries(
      teacherGroups,
    )) {
      // Encabezado del profesor
      worksheet.mergeCells(`B${currentRow}:H${currentRow}`);
      const teacherHeader = worksheet.getCell(`B${currentRow}`);
      teacherHeader.value = `Profesor: ${teacherName}`;
      teacherHeader.font = { bold: true, size: 14, color: { argb: 'FFFFFF' } };
      teacherHeader.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF6600' },
      };
      teacherHeader.alignment = { horizontal: 'center', vertical: 'middle' };
      currentRow++;

      // Headers de columnas
      const headers = [
        'CÓDIGO',
        'ASIGNATURA',
        'SECCIÓN',
        'PROFESOR',
        'CAPACIDAD',
      ];
      worksheet.getRow(currentRow).values = ['', ...headers];
      this.styleColumnHeaders(worksheet, currentRow);
      currentRow++;

      // Datos del profesor
      for (const section of teacherSections) {
        const rowData = [
          '',
          section.subject?.code || '',
          section.subject?.name || '',
          section.name || '',
          section.teacher
            ? `${section.teacher.firstName} ${section.teacher.lastName}`
            : '',
          section.capacity || 0,
        ];
        worksheet.getRow(currentRow).values = rowData;
        currentRow++;
      }

      currentRow += 2; // Espacio entre grupos
    }
  }

  private groupBySemester(sections: any[]): Record<string, any[]> {
    return sections.reduce((groups, section) => {
      const semester = section.subject?.semester || 'N/A';
      if (!groups[semester]) {
        groups[semester] = [];
      }
      groups[semester].push(section);
      return groups;
    }, {});
  }

  private groupByTeacher(sections: any[]): Record<string, any[]> {
    return sections.reduce((groups, section) => {
      const teacherName = section.teacher
        ? `${section.teacher.firstName} ${section.teacher.lastName}`
        : 'Sin Profesor';
      if (!groups[teacherName]) {
        groups[teacherName] = [];
      }
      groups[teacherName].push(section);
      return groups;
    }, {});
  }

  private styleColumnHeaders(worksheet: ExcelJS.Worksheet, row: number): void {
    const headerRow = worksheet.getRow(row);
    headerRow.eachCell((cell, colNumber) => {
      if (colNumber > 1) {
        // Saltar la primera columna vacía
        cell.font = { bold: true, size: 12, color: { argb: 'FFFFFF' } };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '4684FF' },
        };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      }
    });
  }

  private applyReportStyles(worksheet: ExcelJS.Worksheet): void {
    // Ajustar ancho de columnas
    worksheet.columns = [
      { key: 'A', width: 2 }, // Columna vacía
      { key: 'B', width: 20 }, // Títulos
      { key: 'C', width: 15 }, // Código
      { key: 'D', width: 75 }, // Asignatura
      { key: 'E', width: 15 }, // Semestre
      { key: 'F', width: 15 }, // Sección
      { key: 'G', width: 75 }, // Profesor
      { key: 'H', width: 15 }, // Capacidad
    ];

    // Aplicar bordes a todas las celdas con datos
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        if (cell.value) {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        }
      });
    });
  }
}
