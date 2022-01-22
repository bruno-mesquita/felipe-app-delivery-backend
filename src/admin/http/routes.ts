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
import { cityManagerRoutes } from '../modules/city-manager';

const routes = Router();

routes.use([
  authRoutes,
  ownerRoutes,
  deliverymanRoutes,
  cityStore,
  cityRoutes,
  stateRoutes,
  categoryRoutes,
  termsOfUseRoutes,
  announcementRoutes,
  cityManagerRoutes,
])

export default routes;
