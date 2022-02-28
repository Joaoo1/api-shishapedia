import { RequestHandler } from 'express';

import { NotFoundError } from '../errors/NotFoundError';

const NotFoundHandler: RequestHandler = (req, res, next) => {
  next(new NotFoundError('Rota não encontrada'));
};

export { NotFoundHandler };
