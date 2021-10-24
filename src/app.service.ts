import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  logger: Logger;

  constructor() {
    this.logger = new Logger(AppService.name);
  }

  getHello(): string {
    this.logger.debug('root level request done');
    return 'Hello World!';
  }
}
