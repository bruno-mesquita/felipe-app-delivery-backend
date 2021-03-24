import { Router } from 'express';
import { menuRoutes } from '@store/modules/menus/menu.routes';
import { productsRoutes } from '@store/modules/product/product.routes';

const routes = Router();

routes.use(productsRoutes);
routes.use(menuRoutes);

export default routes;
