import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: FastifyRequest, response: FastifyReply, next: any): void {
    const { ip, method, url } = request;
    const { statusCode } = response;
    this.logger.log(`${method} ${url} ${statusCode} - ${ip}`);

    next();
  }
}
