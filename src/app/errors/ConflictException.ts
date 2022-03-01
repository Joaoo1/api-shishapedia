import { BaseException } from './BaseException';

class ConflictException extends BaseException {
  constructor(message: string) {
    super(409, message);
  }
}

export { ConflictException };
