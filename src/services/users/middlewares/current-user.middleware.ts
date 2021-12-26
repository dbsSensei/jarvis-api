import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from '../user.entity';
import { UsersService } from '../users.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentUser } = req.session || {};
      const user = await this.usersService.findOne(currentUser.id);
      req.currentUser = user;
    } catch (error) {
      req.currentUser = null;
    }

    next();
  }
}
