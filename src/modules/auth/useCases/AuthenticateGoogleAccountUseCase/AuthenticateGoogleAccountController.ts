import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IGoogleAuthUser } from '@shared/infra/http/passport/strategies/GoogleStrategy';
import { AuthenticateGoogleAccountUseCase } from './AuthenticateGoogleAccountUseCase';

class AuthenticateGoogleAccountController {
  async handle(request: Request, response: Response) {
    const authGoogleAccountUseCase = container.resolve(
      AuthenticateGoogleAccountUseCase
    );

    const token = await authGoogleAccountUseCase.execute(
      request.user as IGoogleAuthUser
    );

    const redirectLink = `shishapedia://shishapedia.io?token=${token.accessToken}`;

    return response.redirect(redirectLink);
  }
}

export { AuthenticateGoogleAccountController };
