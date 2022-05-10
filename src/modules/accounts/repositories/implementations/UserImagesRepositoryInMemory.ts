import { CreateUserImageDao } from '@modules/accounts/dao/CreateUserImageDao';
import { UserImage } from '@modules/accounts/entities/UserImage';
import { IUserImagesRepository } from '../IUserImagesRepository';

export class UserImagesRepositoryInMemory implements IUserImagesRepository {
  private userImages: UserImage[] = [];

  private currentId = 1;

  async create(data: CreateUserImageDao): Promise<UserImage> {
    const image = new UserImage();
    Object.assign(image, {
      id: this.currentId,
      ...data,
    });
    this.currentId += 1;
    this.userImages.push(image);
    return image;
  }

  async delete(id: number): Promise<UserImage> {
    const idx = this.userImages.findIndex(userImage => userImage.id === id);
    const [deletedImage] = this.userImages.splice(idx, 1);
    return deletedImage;
  }
}
