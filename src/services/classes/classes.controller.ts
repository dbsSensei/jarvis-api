import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { ClassesService } from './classes.service';
// import { UpdateClassDto } from './dtos/update-class-dto';
import { ClassDto } from './dtos/class.dto';
import { CreateClassDto } from './dtos/create-class.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { User } from '../users/user.entity';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { UpdateClassDto } from './dtos/update-class.dto';

@Controller('classes')
@Serialize(ClassDto)
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  // @Get('/:id')
  // async findClass(@Param('id') id: string) {
  //   const user = await this.classesService.findOne(parseInt(id));
  //   return user;
  // }

  // @Get()
  // findAllClasses(@Query('email') email: string, @Query('id') id: string) {
  //   return this.classesService.findAll({ id: parseInt(id), email });
  // }

  // @Delete('/:id')
  // removeClass(@Param('id') id: string) {
  //   return this.classesService.delete(parseInt(id));
  // }

  @Post()
  @UseGuards(JwtAuthGuard)
  createClass(@Body() body: CreateClassDto, @CurrentUser() user: User) {
    return this.classesService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  updateClass(@Param('id') id: string, @CurrentUser() user: User, @Body() body: UpdateClassDto) {
    return this.classesService.update(parseInt(id), user, body);
  }
}
