import {
  // Body,
  Controller,
  Delete,
  Get,
  Param,
  // Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { UsersService } from './users.service';
// import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user-decorator';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/whoami')
  async whoami(@CurrentUser() user: User) {
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string, @Query('id') id: string) {
    return this.usersService.findAll({ id: parseInt(id), email });
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string, @CurrentUser() user: User) {
    return this.usersService.delete(parseInt(id), user);
  }

  // @Patch('/:id')
  // updateUser(@Param('id') id: string, @CurrentUser() user: User, @Body() body: UpdateUserDto) {
  //   return this.usersService.update(parseInt(id), user, body );
  // }
}
