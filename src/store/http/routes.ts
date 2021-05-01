import { Router } from 'express';
import { menuRoutes } from '@store/modules/menus/menu.routes';
import { productsRoutes } from '@store/modules/product/product.routes';
import { authRoutes } from '@store/modules/auth';
import { establishmentRoutes } from '@store/modules/establishment';
import { termsOfUseRoutes } from '@store/modules/terms-of-use/terms-of-use.routes';
import { addressRoutes } from '@store/modules/address-establishment/address.routes';
import { imagesRoutes } from '@store/modules/image/image.routes';

import isAuthenticated from '@shared/middlewares/is-authenticated';

const routes = Router();

routes.use(authRoutes);
routes.use(isAuthenticated);
routes.use(productsRoutes);
routes.use(establishmentRoutes);
routes.use(menuRoutes);
routes.use(termsOfUseRoutes);
routes.use(addressRoutes);
routes.use(imagesRoutes);

export default routes;
