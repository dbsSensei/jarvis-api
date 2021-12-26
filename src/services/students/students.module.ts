import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from '../classes/class.entity';
import { ClassesService } from '../classes/classes.service';

import { Student } from './student.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Class])],
  controllers: [StudentsController],
  providers: [StudentsService, ClassesService],
})
export class StudentsModule {}
