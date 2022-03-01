import { Router } from 'express';

import { CreateAccountController } from '@modules/accounts/useCases/CreateAccountUseCase/CreateAccountsController';
import { CreateAccountRateLimit } from '../middlewares/CreateAccountRateLimit';

const accountsRoutes = Router();

const createAccountController = new CreateAccountController();

accountsRoutes.post(
  '/',
  CreateAccountRateLimit,
  createAccountController.handle
);

export { accountsRoutes };
