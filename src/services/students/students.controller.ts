import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { StudentsService } from './students.service';
// import { UpdateStudentDto } from './dtos/update-class-dto';
import { StudentDto } from './dtos/student.dto';
import { CreateStudentDto } from './dtos/create-student.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { User } from '../users/user.entity';
import { CurrentUser } from '../users/decorators/current-user-decorator';

@Controller('students')
@Serialize(StudentDto)
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  // @Get('/:id')
  // async findStudent(@Param('id') id: string) {
  //   const user = await this.studentsService.findOne(parseInt(id));
  //   return user;
  // }

  // @Get()
  // findAllStudents(@Query('email') email: string, @Query('id') id: string) {
  //   return this.studentsService.findAll({ id: parseInt(id), email });
  // }

  // @Delete('/:id')
  // removeStudent(@Param('id') id: string) {
  //   return this.studentsService.delete(parseInt(id));
  // }

  @Post()
  @UseGuards(JwtAuthGuard)
  createStudent(@Body() body: CreateStudentDto, @CurrentUser() user: User) {
    return this.studentsService.create(body, user);
  }

  // @Patch('/:id')
  // updateStudent(@Param('id') id: string, @Body() body: UpdateStudentDto) {
  //   return this.studentsService.update(parseInt(id), body);
  // }
}
