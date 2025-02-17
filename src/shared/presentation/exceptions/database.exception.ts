import { HttpException, Logger } from '@nestjs/common';

export class DatabaseException extends HttpException {
  private readonly logger: Logger = new Logger(DatabaseException.name);

  constructor(error: HttpException) {
    super(error.message, error.getStatus());
    this.logger.error(error.message, error.stack);
  }
}
