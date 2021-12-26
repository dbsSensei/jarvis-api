import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // AfterInsert,
  // AfterUpdate,
  // AfterRemove,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/services/users/user.entity';
import { StudentType } from './interfaces/student-type';
import { Class } from '../classes/class.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: StudentType,
  })
  type: StudentType;

  @ManyToOne(() => User, (teacher) => teacher.students)
  teacher: User;

  @ManyToOne(() => Class, (_class) => _class.students)
  class: Class;

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
