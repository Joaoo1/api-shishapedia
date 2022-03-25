import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/CreateUserUseCase/CreateUserController';
import { UpdateUserController } from '@modules/users/useCases/UpdateUserUseCase/UpdateUserController';
import { UpdateUserImageController } from '@modules/users/useCases/UpdateUserImageUseCase/UpdateUserImageController';
import { CreateUserRateLimit } from '../middlewares/CreateUserRateLimit';
import { EnsureAuthenticatedMiddleware } from '../middlewares/EnsureAuthenticated';
import UploadImage from '../middlewares/UploadImage';
import CreateThumbMiddleware from '../middlewares/CreateThumb';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const updateUserImageController = new UpdateUserImageController();

usersRoutes.post('/', CreateUserRateLimit, createUserController.handle);

usersRoutes.use(EnsureAuthenticatedMiddleware);

usersRoutes.put('/', updateUserController.handle);

usersRoutes.patch(
  '/images',
  UploadImage({ maxSizeMB: 2 }),
  CreateThumbMiddleware,
  updateUserImageController.handle
);

export { usersRoutes };
