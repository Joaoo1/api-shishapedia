import { Router } from 'express';
import rateLimit from 'express-rate-limit';

import createUserRateLimit from '@config/createUserRateLimit';
import UsersController from '../modules/users/UsersController';

const publicRoutes = Router();

publicRoutes.post(
  '/users',
  rateLimit(createUserRateLimit),
  UsersController.store
);

export { publicRoutes };
