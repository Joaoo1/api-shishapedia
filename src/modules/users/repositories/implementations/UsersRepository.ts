import { inject, injectable } from 'tsyringe';
import { PrismaClient } from '@prisma/client';

import { CreateUserDao } from '../../dao/CreateUserDao';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@inject('PrismaClient') private database: PrismaClient) {}

  findById(id: number): Promise<User | null> {
    return this.database.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.database.user.findUnique({ where: { email } });
  }

  findByGoogleId(googleId: string): Promise<User | null> {
    return this.database.user.findUnique({ where: { googleId } });
  }

  findByFacebookId(facebookId: string): Promise<User | null> {
    return this.database.user.findUnique({ where: { facebookId } });
  }

  async create(data: CreateUserDao): Promise<User> {
    return this.database.user.create({ data });
  }
}
