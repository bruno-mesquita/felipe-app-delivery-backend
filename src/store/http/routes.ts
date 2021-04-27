import { Router } from 'express';
import { menuRoutes } from '@store/modules/menus/menu.routes';
import { productsRoutes } from '@store/modules/product/product.routes';
import { authRoutes } from '@store/modules/auth';
import { establishmentRoutes } from '@store/modules/establishment';

import isAuthenticated from '@shared/middlewares/is-authenticated';

const routes = Router();

routes.use(authRoutes);
routes.use(isAuthenticated);
routes.use(productsRoutes);
routes.use(establishmentRoutes);
routes.use(menuRoutes);

export default routes;
