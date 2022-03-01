import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classTransformer } from '../../../common/utils/classTransformer';
import { User } from '../../entities/User';
import { CreateAccountService } from './CreateAccountService';
import { createAccountValidator } from '../../validators/CreateAccountValidator';

class CreateAccountController {
  async handle(request: Request, response: Response) {
    const validatedBody = await createAccountValidator(request.body);

    const service = container.resolve(CreateAccountService);
    const user = await service.execute(validatedBody);

    return response.status(201).json(classTransformer(User, user));
  }
}

export { CreateAccountController };
