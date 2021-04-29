import { Router } from 'express';
import { establishmentRoutes } from '../modules/establishment';
import { categoryRoutes } from '../modules/category/category.routes';
import { cityRoutes } from '../modules/city';
import { stateRoutes } from '../modules/state';
import { authRoutes } from '../modules/auth'
import { addressEstablishmentRoutes as cityStore } from '../modules/address/address.routes';

const routes = Router();

routes.use(authRoutes);
routes.use(cityStore);
routes.use(cityRoutes);
routes.use(stateRoutes);
routes.use(establishmentRoutes);
routes.use(categoryRoutes);

export default routes;
