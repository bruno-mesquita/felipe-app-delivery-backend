import { Router } from 'express';

import { clientRoutes } from '../modules/client';
import { authRoutes } from '../modules/auth';
import { establishmentCategoryRoutes } from '../modules/establishment-category';
import { establishmentRoutes } from '../modules/establishment';
import { clientAddressRoutes } from '../modules/address-client';

const routes = Router();

routes.use(authRoutes);
routes.use(clientRoutes);
routes.use(establishmentCategoryRoutes);
routes.use(establishmentRoutes);
routes.use(clientAddressRoutes);

export default routes;
