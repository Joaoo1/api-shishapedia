import { Router } from 'express';
import passport from 'passport';

import { AuthenticateEmailAccountController } from '@modules/accounts/useCases/AuthenticateEmailAccountUseCase/AuthenticateEmailAccountController';
import { AuthenticateGoogleAccountController } from '@modules/accounts/useCases/AuthenticateGoogleAccountUseCase/AuthenticateGoogleAccountController';
import { AuthenticateFacebookAccountController } from '@modules/accounts/useCases/AuthenticateFacebookAccountUseCase/AuthenticateFacebookAccountController';

const authRoutes = Router();

const authenticateEmailAccountController =
  new AuthenticateEmailAccountController();

const authenticateGoogleAccountController =
  new AuthenticateGoogleAccountController();

const authenticateFacebookAccountController =
  new AuthenticateFacebookAccountController();

authRoutes.post('/email', authenticateEmailAccountController.handle);

authRoutes.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/user.birthday.read',
    ],
  })
);

authRoutes.get(
  '/google/callback',
  passport.authenticate('google'),
  authenticateGoogleAccountController.handle
);

authRoutes.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'user_birthday'],
  })
);

authRoutes.get(
  '/facebook/callback',
  passport.authenticate('facebook'),
  authenticateFacebookAccountController.handle
);

export { authRoutes };
