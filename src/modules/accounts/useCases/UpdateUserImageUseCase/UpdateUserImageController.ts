import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classTransformer } from '@modules/common/utils/classTransformer';
import { User } from '@modules/accounts/entities/User';
import { UpdateUserImageUseCase } from './UpdateUserImageUseCase';

class UpdateUserImageController {
  async handle(request: Request, response: Response) {
    const updateUserImageUseCase = container.resolve(UpdateUserImageUseCase);
    const user = await updateUserImageUseCase.execute({
      image: request.file || null,
      thumb: request.thumbFile || null,
      userId: request.user.id,
    });

    return response.status(200).json(classTransformer(User, user));
  }
}

export { UpdateUserImageController };
