import { RequestHandler } from 'express';

import { NotFoundException } from '../errors/NotFoundException';

const NotFoundHandler: RequestHandler = (req, res, next) => {
  next(new NotFoundException('Rota não encontrada'));
};

export { NotFoundHandler };
