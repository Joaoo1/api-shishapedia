import { inject, injectable } from 'tsyringe';
import { join } from 'path';
import { unlink } from 'fs/promises';

import { UpdateUserImageBO } from '@modules/users/bo/UpdateUserImageBO';
import { User } from '@modules/users/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { NotFoundException } from '@shared/errors/NotFoundException';
import { IUserImagesRepository } from '@modules/users/repositories/IUserImagesRepository';
import { imagesUploadFolder } from '@config/multer';

@injectable()
class UpdateUserImageUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UsersImagesRepository')
    private readonly usersImagesRepository: IUserImagesRepository
  ) {}

  async execute({ image, thumb, userId }: UpdateUserImageBO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    let userImage;
    let userThumb;

    if (image) {
      userImage = await this.usersImagesRepository.create({
        name: image.originalname,
        path: image.filename,
      });
    }

    if (thumb) {
      userThumb = await this.usersImagesRepository.create({
        name: thumb.originalname,
        path: thumb.filename,
      });
    }

    const updatedUser = await this.usersRepository.update(userId, {
      imageId: userImage?.id || null,
      thumbId: userThumb?.id || null,
    });

    if (user.image) {
      unlink(join(imagesUploadFolder, user.image.path));
    }

    if (user.thumb) {
      unlink(join(imagesUploadFolder, user.thumb.path));
    }

    return updatedUser;
  }
}

export { UpdateUserImageUseCase };
