import { Router } from 'express';

import { publicRoutes } from './public.routes';

const router = Router();

router.use(publicRoutes);

export { router };
