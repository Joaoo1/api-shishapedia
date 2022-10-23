import { RequestHandler } from 'express';

import { NotFoundError } from '@shared/infra/http/errors/NotFoundError';

const NotFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new NotFoundError('Rota não encontrada'));
};

export { NotFoundHandler };
