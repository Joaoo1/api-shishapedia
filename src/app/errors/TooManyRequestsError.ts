import { BaseError } from './BaseError';

class TooManyRequestsError extends BaseError {
  constructor(
    message = 'Muitas requisições foram feitas do seu IP. Tente novamente em alguns minutos'
  ) {
    super(429, message);
  }
}

export { TooManyRequestsError };
