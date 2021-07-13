import { Router } from 'express';

import { categoryRoutes } from '../modules/category/category.routes';
import { cityRoutes } from '../modules/city';
import { stateRoutes } from '../modules/state';
import { authRoutes } from '../modules/auth'
import { addressEstablishmentRoutes as cityStore } from '../modules/address/address.routes';
import { routes as termsOfUseRoutes } from '../modules/terms-of-use/terms-of-use.routes';
import { ownerRoutes } from '../modules/establisment-owner';
import { deliverymanRoutes } from '../modules/deliveryman';
import { announcementRoutes } from '../modules/announcement/announcement.routes';

const routes = Router();

routes.use(authRoutes);
routes.use(ownerRoutes);
routes.use(deliverymanRoutes);
routes.use(cityStore);
routes.use(cityRoutes);
routes.use(stateRoutes);
routes.use(categoryRoutes);
routes.use(termsOfUseRoutes);
routes.use(announcementRoutes);

export default routes;
