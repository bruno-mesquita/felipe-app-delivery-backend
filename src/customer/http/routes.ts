import { Router } from 'express';

import { avatarRoutes } from '../modules/avatar';
import { clientRoutes } from '../modules/client';
import { authRoutes } from '../modules/auth';
import { establishmentCategoryRoutes } from '../modules/establishment-category';
import { establishmentRoutes } from '../modules/establishment';
import { clientAddressRoutes } from '../modules/address-client';
import { addressStateRoutes } from '../modules/address-state';
import { orderRouter } from '../modules/order';
import { menuRoutes } from '../modules/menus';

const routes = Router();

routes.use(authRoutes);
routes.use(addressStateRoutes);
routes.use(clientRoutes);
routes.use(avatarRoutes);
routes.use(establishmentCategoryRoutes);
routes.use(establishmentRoutes);
routes.use(clientAddressRoutes);
routes.use(orderRouter);
routes.use(menuRoutes);

export default routes;
