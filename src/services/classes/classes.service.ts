import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto } from './dtos/create-class.dto';
import { User } from 'src/services/users/user.entity';

@Injectable()
export class ClassesService {
  constructor(@InjectRepository(Class) private repo: Repository<Class>) {}

  create(classDto: CreateClassDto, user: User) {
    const _class = this.repo.create(classDto);
    _class.user = user;
    return this.repo.save(_class);
  }

  async findOne(id: number, passError?: boolean) {
    const _class = await this.repo.findOne({ id });
    if(!_class && !passError){
      throw new NotFoundException('Class not found!')
    }
    return _class;
  }
}
