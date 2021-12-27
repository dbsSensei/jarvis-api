import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ClassType } from '../interfaces/class-type';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsEnum(ClassType)
  type: ClassType;

  @IsString()
  subject: string;

  @IsString()
  time: string;

  @IsString()
  @IsOptional()
  info?: string;
}
