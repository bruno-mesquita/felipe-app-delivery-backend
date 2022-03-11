import { Router } from 'express';

import { clientRoutes } from '../modules/client';
import { authRoutes } from '../modules/auth';
import { avatarRoutes } from '../modules/avatar';
import { categoryRoutes } from '../modules/category';
import { establishmentRoutes } from '../modules/establishment';
import { clientAddressRoutes } from '../modules/address-client';
import { stateRoutes } from '../modules/state';
import { orderRoutes } from '../modules/order';
import { menuRoutes } from '../modules/menus';
import { rateRoutes } from '../modules/rate';
import { notificationsRoutes } from '../modules/notifications';
import { announcementRoutes } from '../modules/announcement';
import { productsRoutes } from '../modules/products';
import { imageRoutes } from '../modules/image';

const routes = Router();

routes.use([
  authRoutes,
  clientRoutes,
  clientAddressRoutes,
  categoryRoutes,
  menuRoutes,
  stateRoutes,
  rateRoutes,
  orderRoutes,
  announcementRoutes,
  avatarRoutes,
  establishmentRoutes,
  notificationsRoutes,
  productsRoutes,
  imageRoutes,
]);

export default routes;
