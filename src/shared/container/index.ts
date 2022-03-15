import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';

import prisma from '@shared/providers/database';
import { UsersRepository } from '@modules/users/repositories/implementations/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

container.register<PrismaClient>('PrismaClient', {
  useValue: prisma,
});

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
