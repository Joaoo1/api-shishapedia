import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';

import prisma from '@shared/providers/database';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UserImagesRepository } from '@modules/accounts/repositories/implementations/UserImagesRepository';
import { IUserImagesRepository } from '@modules/accounts/repositories/IUserImagesRepository';

container.register<PrismaClient>('PrismaClient', {
  useValue: prisma,
});

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserImagesRepository>(
  'UsersImagesRepository',
  UserImagesRepository
);
