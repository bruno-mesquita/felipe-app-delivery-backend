import { Router } from 'express';

import { clientRoutes } from '../modules/client';
import { authRoutes } from '../modules/auth';

const routes = Router();

routes.use(authRoutes);
routes.use(clientRoutes);

export default routes;
