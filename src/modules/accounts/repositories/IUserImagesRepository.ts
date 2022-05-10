import { CreateUserImageDao } from '../dao/CreateUserImageDao';
import { UserImage } from '../entities/UserImage';

export interface IUserImagesRepository {
  create(data: CreateUserImageDao): Promise<UserImage>;
  delete(id: number): Promise<UserImage>;
}
