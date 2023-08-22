import { Module } from '@nestjs/common';
import { CareerModule } from './career/career.module';

@Module({
  imports: [CareerModule],
})
export class RepositoriesModule {}
