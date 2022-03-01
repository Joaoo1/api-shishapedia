import { BaseException } from './BaseException';

class NotFoundException extends BaseException {
  constructor(message: string) {
    super(404, message);
  }
}

export { NotFoundException };
