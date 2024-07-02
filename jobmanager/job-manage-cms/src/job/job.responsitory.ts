import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/repositories/base.repositories';
import { Job } from './job.entity';

@Injectable()
export class JobRepository extends BaseRepository<Job> {
  constructor(dataSource: DataSource) {
    super(Job, dataSource);
  }
}
