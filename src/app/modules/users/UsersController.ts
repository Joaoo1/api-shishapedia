import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classTransformer } from '../common/utils/classTransformer';
import { User } from './entities/User';
import { CreateUserService } from './services/CreateUserService';
import { createUserValidator } from './validators/CreateUserValidator';

class UsersController {
  async store(request: Request, response: Response) {
    const validatedBody = await createUserValidator(request.body);

    const service = container.resolve(CreateUserService);
    const user = await service.execute(validatedBody);

    return response.status(201).json(classTransformer(User, user));
  }
}

export default new UsersController();
