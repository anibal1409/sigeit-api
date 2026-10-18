import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocumentE } from './entities';

/** Formatos de documento por departamento. */
@Module({
  imports: [TypeOrmModule.forFeature([DocumentE])],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [TypeOrmModule, DocumentService],
})
export class DocumentModule {}
