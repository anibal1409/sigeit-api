import { getConnectionOptions } from 'typeorm';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          charset: 'utf8mb4',
          timezone: 'Z',
          ssl: process.env.TYPEORM_SSL === 'true',
          extra: {
            connectionLimit: 100,
            ssl:
              process.env.TYPEORM_SSL === 'true'
                ? {
                    rejectUnauthorized: false,
                  }
                : null,
          },
        }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.prod', '.env.local'],
    }),
    RepositoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
