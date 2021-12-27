import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utils } from '../../utils';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({
      email,
      password,
    });
    return this.repo.save(user);
  }

  async findOne(id: number, passError?: boolean) {
    const user = await this.repo.findOne({ id });
    if (!user && !passError) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async findAll(options: Partial<User> | any) {
    options = Utils.objectCleaner(options);
    const user = await this.repo.find({ ...options });
    return user;
  }

  // async update(id: number, currentUser: User, attrs: Partial<User>) {
  //   attrs = Utils.objectCleaner(attrs);
  //   const user = await this.findOne(id);
  //   if (user.id !== currentUser.id) {
  //     throw new UnauthorizedException('You not allowed to update this user');
  //   }
  //   const updatedUser = { ...user, ...attrs };
  //   return this.repo.save(updatedUser);
  // }

  async delete(id: number, currentUser: User) {
    const user = await this.findOne(id);
    if (user.id !== currentUser.id) {
      throw new UnauthorizedException('You not allowed to delete this user');
    }
    return this.repo.softRemove({ id: user.id });
  }
}
