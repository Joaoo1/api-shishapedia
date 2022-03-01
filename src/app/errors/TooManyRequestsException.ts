import { BaseException } from './BaseException';

class TooManyRequestsException extends BaseException {
  constructor(
    message = 'Muitas requisições foram feitas do seu IP. Tente novamente em alguns minutos'
  ) {
    super(429, message);
  }
}

export { TooManyRequestsException };
