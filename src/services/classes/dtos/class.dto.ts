import { Expose, Transform } from 'class-transformer';

export class ClassDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  type: string;

  @Expose()
  subject: string;

  @Expose()
  time: string;
  
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
