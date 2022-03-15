import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classTransformer } from '../../../common/utils/classTransformer';
import { User } from '../../entities/User';
import { CreateUserUseCase } from './CreateUserUseCase';
import { createUserValidator } from '../../validators/CreateUserValidator';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const validatedBody = await createUserValidator(request.body);

    const createUserUseCase = container.resolve(CreateUserUseCase);
    const user = await createUserUseCase.execute(validatedBody);

    return response.status(201).json(classTransformer(User, user));
  }
}

export { CreateUserController };
