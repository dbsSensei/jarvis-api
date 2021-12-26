import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dtos/create-student.dto';
import { User } from 'src/services/users/user.entity';
import { ClassesService } from '../classes/classes.service';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private repo: Repository<Student>, private classesService: ClassesService) {}

  async create(studentDto: CreateStudentDto, user: User) {
    const student = this.repo.create(studentDto);
    const _class = await this.classesService.findOne(studentDto.classId)
    
    student.teacher = user;
    student.class = _class
    return this.repo.save(student);
  }
}
