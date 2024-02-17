import { getConnectionOptions } from 'typeorm';

// eslint-disable-next-line prettier/prettier
import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivitiesModule } from './activities/activities.module';
import { ActivityLoggerMiddleware } from './activities/activity-logger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.prod', '.env.local', '.env.auditoria'],
    }),
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
    RepositoriesModule,
    AuthModule,
    ActivitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ActivityLoggerMiddleware).forRoutes('*');
  }
}
