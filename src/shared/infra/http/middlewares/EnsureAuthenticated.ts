import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { container } from 'tsyringe';

import { UnauthorizedException } from '@shared/errors/UnauthorizedException';
import { NotFoundException } from '@shared/errors/NotFoundException';
import { UsersRepository } from '@modules/users/repositories/implementations/UsersRepository';
import authConfig from '@config/auth';

interface IPayload {
  id: number;
}

export async function EnsureAuthenticatedMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedException('Token ausente');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { id } = verify(token, authConfig.jwtSecret) as IPayload;

    const usersRepository = container.resolve(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    request.user = { id };

    next();
  } catch {
    throw new UnauthorizedException('Token inválido');
  }
}
