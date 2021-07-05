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
import { routesFinancial } from '@store/modules/financial/financial.routes';
import { categoryRoutes } from '@store/modules/category';
import { establishmentCategoriesRoutes } from '@store/modules/establishment-categories';
import { ownerRoutes } from '@store/modules/owner';
import { boletosRoutes } from '@store/modules/boletos';
import { deliverymanRoutes } from '@store/modules/deliveryman';

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
  routesFinancial
]);

export default routes;
