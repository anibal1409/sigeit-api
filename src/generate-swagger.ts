import * as fs from 'fs';

// generate-swagger.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function generateSwagger() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('SIGEIT-API Documentation')
    .setDescription('API completa para el Sistema de Gestión de Información Educativa y Tecnológica')
    .setVersion('1.0')
    .addTag('activities', 'Gestión de actividades y logs del sistema')
    .addTag('auth', 'Autenticación y autorización')
    .addTag('careers', 'Gestión de carreras universitarias')
    .addTag('classrooms', 'Gestión de aulas y salones')
    .addTag('days', 'Gestión de días y calendario')
    .addTag('departments', 'Gestión de departamentos académicos')
    .addTag('documents', 'Gestión de documentos')
    .addTag('inscriptions', 'Gestión de inscripciones estudiantiles')
    .addTag('periods', 'Gestión de períodos académicos')
    .addTag('schedules', 'Gestión de horarios')
    .addTag('schools', 'Gestión de escuelas y facultades')
    .addTag('sections', 'Gestión de secciones de clases')
    .addTag('subjects', 'Gestión de materias y asignaturas')
    .addTag('teachers', 'Gestión de profesores')
    .addTag('users', 'Gestión de usuarios del sistema')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Guarda el documento en un archivo JSON
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  await app.close();
  console.log('Especificación OpenAPI generada en ./swagger.json');
}

generateSwagger(); 