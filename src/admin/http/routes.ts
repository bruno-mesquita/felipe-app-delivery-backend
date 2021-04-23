import { Router } from 'express';
import { establishmentRoutes } from '../modules/establishment';
import { categoryRoutes } from '../modules/category/category.routes';
import { cityRoutes } from '../modules/city';
import { stateRoutes } from '../modules/state';
import { authRoutes } from '../modules/auth'

const routes = Router();

routes.use(authRoutes);
routes.use(cityRoutes);
routes.use(stateRoutes);
routes.use(establishmentRoutes);
routes.use(categoryRoutes);

export default routes;
