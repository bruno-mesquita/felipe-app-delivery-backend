import { Router } from 'express';

import { avatarRoutes } from '../modules/avatar';
import { clientRoutes } from '../modules/client';
import { authRoutes } from '../modules/auth';

const routes = Router();

routes.use(authRoutes);
routes.use(clientRoutes);
routes.use(avatarRoutes);

export default routes;
