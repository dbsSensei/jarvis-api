import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // AfterInsert,
  // AfterUpdate,
  // AfterRemove,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { Class } from '../classes/class.entity';
import { Report } from 'src/services/reports/report.entity';
import { Student } from '../students/student.entity';
import { UserRole } from './interfaces/user-role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: 'musyrif',
  })
  role: UserRole;

  @OneToMany(() => Student, (student) => student.teacher)
  students: Student[];

  @OneToMany(() => Class, (classEntity) => classEntity.user)
  classes: Class[];

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at: Date;
  // @AfterInsert()
  // logInsert() {
  //   console.log('Inserted User with id', this.id);
  // }

  // @AfterUpdate()
  // logUpdate() {
  //   console.log('Updated User with id', this.id);
  // }

  // @AfterRemove()
  // logRemove() {
  //   console.log('Removed User with id', this.id);
  // }
}
