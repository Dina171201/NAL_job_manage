import { User } from 'src/auth/user.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { JobStatus } from 'src/common/enums/job.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'job' })
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.INPROGRESS,
  })
  status: JobStatus;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
