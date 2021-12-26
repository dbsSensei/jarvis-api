import { IsEnum, IsNumber, IsString } from 'class-validator';
import { StudentType } from '../interfaces/student-type';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsEnum(StudentType)
  type: StudentType;

  @IsNumber()
  classId: number;
}
