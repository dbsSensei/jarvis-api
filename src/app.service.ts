import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStarted() {
    return {
      status: 'success',
    };
  }
}
