import { Expose, Transform } from 'class-transformer';
import { StudentType } from '../interfaces/student-type';

export class StudentDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  type: StudentType;

  @Transform(({ obj }) => {
    return obj.teacher.id;
  })
  @Expose()
  teacherId: number;

  @Transform(({ obj }) => {
    return obj.class.id;
  })
  @Expose()
  classId: number;
}
