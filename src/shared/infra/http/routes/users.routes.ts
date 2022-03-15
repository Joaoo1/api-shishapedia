import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/CreateUserUseCase/CreateUserController';
import { CreateUserRateLimit } from '../middlewares/CreateUserRateLimit';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/', CreateUserRateLimit, createUserController.handle);

export { usersRoutes };
