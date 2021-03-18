import { Router } from 'express';

import { clientRoutes } from '../modules/client';
import { authRoutes } from '../modules/auth';
import { establishmentCategoryRoutes } from '../modules/establishment-category';

const routes = Router();

routes.use(authRoutes);
routes.use(clientRoutes);
routes.use(establishmentCategoryRoutes);

export default routes;
