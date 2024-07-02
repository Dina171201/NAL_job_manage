import { Module } from '@nestjs/common';
import { JobRepository } from './job.responsitory';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { Job } from './job.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobController],
  providers: [JobRepository, JobService],
  exports: [JobService],
})
export class JobModule {}
