import { HttpException, HttpStatus } from '@nestjs/common';

export class DomainException extends HttpException {
  constructor(message: string) {
    super(`Domain Error: ${message}`, HttpStatus.BAD_REQUEST);
  }
}
