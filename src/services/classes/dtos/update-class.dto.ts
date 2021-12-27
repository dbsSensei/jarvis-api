import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ClassType } from '../interfaces/class-type';

export class UpdateClassDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(ClassType)
  @IsOptional()
  type: ClassType;

  
  @IsString()
  @IsOptional()
  subject: string

  @IsString()
  @IsOptional()
  time: string

  @IsString()
  info: string
}
