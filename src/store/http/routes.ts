import { Router } from 'express';

import { menuRoutes } from '../modules/menus/menu.routes';
import { productsRoutes } from '../modules/product/product.routes';
import { authRoutes } from '../modules/auth';
import { establishmentRoutes } from '../modules/establishment';
import { termsOfUseRoutes } from '../modules/terms-of-use/terms-of-use.routes';
import { addressRoutes } from '../modules/address-establishment/address.routes';
import { imagesRoutes } from '../modules/image/image.routes';
import listRatesRoutes from '../modules/rate/rate.routes';
import { addressStateRoutes } from '../modules/address-state';
import { routesOrders } from '../modules/orders/orders.routes';
import { routesFinancial } from '../modules/financial/financial.routes';
import { categoryRoutes } from '../modules/category';
import { establishmentCategoriesRoutes } from '../modules/establishment-categories';
import { ownerRoutes } from '../modules/owner';
import { boletosRoutes } from '../modules/boletos';
import { deliverymanRoutes } from '../modules/deliveryman';
import { notificationsRoutes } from '../modules/notifications';

const routes = Router();

routes.use([
  authRoutes,
  deliverymanRoutes,
  ownerRoutes,
  boletosRoutes,
  categoryRoutes,
  establishmentCategoriesRoutes,
  addressStateRoutes,
  productsRoutes,
  establishmentRoutes,
  menuRoutes,
  termsOfUseRoutes,
  addressRoutes,
  imagesRoutes,
  listRatesRoutes,
  routesOrders,
  routesFinancial,
  notificationsRoutes
]);

export default routes;
