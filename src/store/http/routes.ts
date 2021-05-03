import { Router } from 'express';

import { menuRoutes } from '@store/modules/menus/menu.routes';
import { productsRoutes } from '@store/modules/product/product.routes';
import { authRoutes } from '@store/modules/auth';
import { establishmentRoutes } from '@store/modules/establishment';
import { termsOfUseRoutes } from '@store/modules/terms-of-use/terms-of-use.routes';
import { addressRoutes } from '@store/modules/address-establishment/address.routes';
import { imagesRoutes } from '@store/modules/image/image.routes';
import listRatesRoutes from '@store/modules/rate/rate.routes';
import { addressStateRoutes } from '@store/modules/address-state';
import { routesOrders } from '@store/modules/orders/orders.routes';

import isAuthenticated from '@shared/middlewares/is-authenticated';

const routes = Router();

routes.use(authRoutes);
routes.use(isAuthenticated);
routes.use(addressStateRoutes);
routes.use(productsRoutes);
routes.use(establishmentRoutes);
routes.use(menuRoutes);
routes.use(termsOfUseRoutes);
routes.use(addressRoutes);
routes.use(imagesRoutes);
routes.use(listRatesRoutes);
routes.use(routesOrders);

export default routes;
