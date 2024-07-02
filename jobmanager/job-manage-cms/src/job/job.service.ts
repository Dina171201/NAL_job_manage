import { Injectable } from '@nestjs/common';
import { JobRepository } from './job.responsitory';
import { CreateJobDto, UpdateJobDto } from './job.dto';
import { User } from 'src/auth/user.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class JobService {
  constructor(private jobRepository: JobRepository) {}
  async createJob(dto: CreateJobDto, user: User) {
    const { name, title } = dto;
    const job = this.jobRepository.create({ name, title, user });
    await this.jobRepository.save(job);
    return job;
  }
  async listJob(user: User, query: { page: number; limit: number }) {
    const { page, limit } = query;
    const list = this.jobRepository
      .createQueryBuilder('job')
      .andWhere('job.user = :user', { user: user.id });
    const { items, meta } = await paginate(list, { page, limit });
    const listJob = await Promise.all(
      items.map(async (item) => {
        const job = await this.jobRepository.findOneBy({ id: item.id });
        return job;
      }),
    );
    return new Pagination(listJob, meta);
  }
  deleteJob(id: number) {
    return this.jobRepository.delete(id);
  }
  async updateJob(dto: UpdateJobDto, user: User) {
    const { id } = dto;
    const job = await this.jobRepository.findOneBy({
      id,
      user: { id: user.id },
    });
    const { name, title, status } = dto;
    job.name = name;
    job.title = title;
    job.status = status;
    await this.jobRepository.save(job);
    // await this.jobRepository.update(id, job);
    return job;
  }
  deleteListJob() {}
}
