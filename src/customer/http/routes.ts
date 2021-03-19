<<<<<<< HEAD
import { Router } from 'express';

import { clientRoutes } from '../modules/client';
import { authRoutes } from '../modules/auth';
import { establishmentCategoryRoutes } from '../modules/establishment-category';
import { establishmentRoutes } from '../modules/establishment';
import { avatarRoutes } from '../modules/avatar';

const routes = Router();

routes.use(authRoutes);
routes.use(clientRoutes);
routes.use(establishmentCategoryRoutes);
routes.use(establishmentRoutes);
routes.use(avatarRoutes);

export default routes;
=======
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
>>>>>>> 83688acf43dde3aff98a23146ea4116c73eb3dda
