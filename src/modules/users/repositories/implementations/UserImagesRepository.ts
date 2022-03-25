import { inject, injectable } from 'tsyringe';
import { PrismaClient } from '@prisma/client';

import { CreateUserImageDao } from '@modules/users/dao/CreateUserImageDao';
import { UserImage } from '@modules/users/entities/UserImage';
import { IUserImagesRepository } from '../IUserImagesRepository';

@injectable()
export class UserImagesRepository implements IUserImagesRepository {
  constructor(@inject('PrismaClient') private database: PrismaClient) {}

  async create(data: CreateUserImageDao): Promise<UserImage> {
    return this.database.userImage.create({ data });
  }

  async delete(id: number): Promise<UserImage> {
    return this.database.userImage.delete({ where: { id } });
  }
}
