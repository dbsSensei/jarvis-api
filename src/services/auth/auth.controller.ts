import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dtos/create-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Session() session: any, @Body() body: CreateUserDto) {
    const user = await this.authService.signup(body.email, body.password);
    session.currentUser = { id: user.id, email: user.email, role: user.role };
    return user;
  }

  @Post('/signin')
  async singin(@Session() session: any, @Body() body: CreateUserDto) {
    const user = await this.authService.signin(body.email, body.password);
    session.currentUser = { id: user.id, email: user.email, role: user.role };
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.currentUser = null;
    return { access_token: null };
  }
}
