import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { updateUserValidator } from '@modules/accounts/validators/UpdateUserValidator';
import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const userId = request.user.id;
    const validatedBody = await updateUserValidator(request.body);

    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    const user = await updateUserUseCase.execute({ userId, ...validatedBody });

    return response.status(200).json(user);
  }
}

export { UpdateUserController };
