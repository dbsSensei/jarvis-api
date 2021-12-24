import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from '../users/users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,private userService: UsersService) {}

  async signup(email: string, password: string) {
    const [user] = await this.userService.findAll({ email });
    if (user) {
      throw new BadRequestException('Email in use!');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = `${salt}.${hash.toString('hex')}`;

    const newUser = await this.userService.create(email, result);
    
    // Send JWT Access Token 
    const payload = { id: newUser.id, email: newUser.email, role: newUser.role };
    newUser["access_token"] = this.jwtService.sign(payload) 
    return newUser;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.findAll({ email });
    if (!user) {
      throw new BadRequestException('Invalid email or password!');
    }

    const [salt, hash] = user.password.split('.');

    const newHash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash !== newHash.toString('hex')) {
      throw new BadRequestException('Invalid email or password!');
    }

    // Send JWT Access Token 
    const payload = { id: user.id, email: user.email, role: user.role };
    user["access_token"] = this.jwtService.sign(payload) 
    return user;
  }
}