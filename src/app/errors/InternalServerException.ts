import { BaseException } from './BaseException';

class InternalServerException extends BaseException {
  constructor() {
    super(500, 'Ocorreu um erro desconhecido');
  }
}

export { InternalServerException };
