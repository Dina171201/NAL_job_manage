import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';
import { dataSource } from 'data-source';
import { JobModule } from './job/job.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import globalConfig from './common/config/global.config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        initializeTransactionalContext();
        return addTransactionalDataSource(dataSource);
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => globalConfig],
      cache: true,
    }),
    JobModule,
    AuthModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: { exposeDefaultValues: true },
      }),
    },
  ],
})
export class AppModule {}
