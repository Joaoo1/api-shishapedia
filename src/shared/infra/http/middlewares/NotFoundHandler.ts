import { RequestHandler } from 'express';

import { NotFoundException } from '@shared/errors/NotFoundException';

const NotFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new NotFoundException('Rota não encontrada'));
};

export { NotFoundHandler };
