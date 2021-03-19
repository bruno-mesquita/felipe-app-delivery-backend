import { Router } from 'express';

import { clientRoutes } from '../modules/client';
import { authRoutes } from '../modules/auth';
import { establishmentCategoryRoutes } from '../modules/establishment-category';
import { establishmentRoutes } from '../modules/establishment';
import { clientAddressRoutes } from '../modules/address-client';
import { stateRoutes } from '../modules/state';
import { orderRouter } from '../modules/order';

const routes = Router();

routes.use(authRoutes);
routes.use(stateRoutes);
routes.use(clientRoutes);
routes.use(establishmentCategoryRoutes);
routes.use(establishmentRoutes);
routes.use(clientAddressRoutes);
routes.use(orderRouter);

export default routes;
