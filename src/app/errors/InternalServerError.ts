import { BaseError } from './BaseError';

class InternalServerError extends BaseError {
  constructor() {
    super(500, 'Ocorreu um erro desconhecido');
  }
}

export { InternalServerError };
