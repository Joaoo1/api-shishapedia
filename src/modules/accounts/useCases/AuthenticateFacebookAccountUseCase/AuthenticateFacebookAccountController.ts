import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IFacebookAuthUser } from '@shared/infra/http/passport/strategies/FacebookStrategy';
import { AuthenticateFacebookAccountUseCase } from './AuthenticateFacebookAccountUseCase';

class AuthenticateFacebookAccountController {
  async handle(request: Request, response: Response) {
    const authFacebookAccountUseCase = container.resolve(
      AuthenticateFacebookAccountUseCase
    );

    const token = await authFacebookAccountUseCase.execute(
      request.user as IFacebookAuthUser
    );

    const redirectLink = `shishapedia://shishapedia.io?token=${token.accessToken}`;

    return response.redirect(redirectLink);
  }
}

export { AuthenticateFacebookAccountController };
