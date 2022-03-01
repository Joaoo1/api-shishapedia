import { BaseException } from './BaseException';

class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super(401, message);
  }
}

export { UnauthorizedException };
