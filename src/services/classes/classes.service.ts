import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto } from './dtos/create-class.dto';
import { User } from 'src/services/users/user.entity';
import { Utils } from 'src/utils';

@Injectable()
export class ClassesService {
  constructor(@InjectRepository(Class) private repo: Repository<Class>) {}

  async findOne(id: number, passError?: boolean) {
    const _class = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!_class && !passError) {
      throw new NotFoundException('Class not found!');
    }
    return _class;
  }

  create(classDto: CreateClassDto, user: User) {
    const _class = this.repo.create(classDto);
    _class.user = user;
    return this.repo.save(_class);
  }

  async update(id: number, currentUser: User, attrs: Partial<Class>) {
    attrs = Utils.objectCleaner(attrs);
    const _class = await this.findOne(id);
    if (_class.user.id !== currentUser.id) {
      throw new UnauthorizedException('You not allowed to update this class');
    }
    const updatedClass = { ..._class, ...attrs };
    return this.repo.save(updatedClass);
  }
}
