import { IsEnum, IsNumber, IsString } from 'class-validator';
import { JobStatus } from 'src/common/enums/job.enum';

export class CreateJobDto {
  @IsString()
  name: string;

  @IsString()
  title: string;
}

export class UpdateJobDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsEnum(JobStatus)
  status: JobStatus;
}
