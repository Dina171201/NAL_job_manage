import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateJobDto, UpdateJobDto } from './job.dto';
import { JobService } from './job.service';
import {
  AuthenticateUser,
  CurrentAuthData,
} from 'src/common/decorators/auth.decorator';
import { User } from 'src/auth/user.entity';

@Controller('job')
@AuthenticateUser()
export class JobController {
  constructor(private jobService: JobService) {}
  @Post('create')
  createJob(@Body() dto: CreateJobDto, @CurrentAuthData() user: User) {
    return this.jobService.createJob(dto, user);
  }
  @Get('list')
  listJob(
    @CurrentAuthData() user: User,
    @Query() query: { page: number; limit: number },
  ) {
    return this.jobService.listJob(user, query);
  }

  @Patch('update')
  updateJob(@Body() dto: UpdateJobDto, @CurrentAuthData() user: User) {
    return this.jobService.updateJob(dto, user);
  }

  @Delete(':id')
  deleteJob(@Param('id') id: number) {
    return this.jobService.deleteJob(id);
  }
}
