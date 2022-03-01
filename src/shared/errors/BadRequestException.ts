import { BaseException } from './BaseException';

class BadRequestException extends BaseException {
  constructor(message: string) {
    super(400, message);
  }
}

export { BadRequestException };
