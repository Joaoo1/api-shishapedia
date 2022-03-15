import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateEmailAccountUseCase } from './AuthenticateEmailAccountUseCase';

class AuthenticateEmailAccountController {
  async handle(request: Request, response: Response) {
    const authenticateEmailAccountUseCase = container.resolve(
      AuthenticateEmailAccountUseCase
    );

    const token = await authenticateEmailAccountUseCase.execute(request.body);

    return response.status(200).json(token);
  }
}

export { AuthenticateEmailAccountController };
