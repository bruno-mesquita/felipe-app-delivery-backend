import { Router } from 'express';
import { menuRoutes } from '@store/modules/menus/menu.routes';
import { productsRoutes } from '@store/modules/product/product.routes';

import isAuthenticated from '@shared/middlewares/is-authenticated';

const routes = Router();

routes.use(isAuthenticated);
routes.use(productsRoutes);
routes.use(menuRoutes);

export default routes;
