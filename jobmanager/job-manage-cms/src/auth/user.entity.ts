import { BaseEntity } from 'src/common/entities/base.entity';
import { Job } from 'src/job/job.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  passWord: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Job, (job) => job.user)
  jobs: Job[];
}
