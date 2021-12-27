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
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from 'src/services/users/user.entity';
import { ClassType } from './interfaces/class-type';
import { Student } from '../students/student.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ClassType,
  })
  type: ClassType

  @Column()
  subject: string;

  @Column()
  time: string;

  @Column({
    nullable: true
  })
  info: string;

  @ManyToOne(() => User, (user) => user.classes)
  user: User;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[]

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
