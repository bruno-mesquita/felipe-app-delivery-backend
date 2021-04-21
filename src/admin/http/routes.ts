import { Router } from 'express';
import { establishmentRoutes } from '../modules/establishment';
import { categoryRoutes } from '../modules/category/category.routes';
import { stateCityRoutes } from '../modules/address/state-city.routes';
import { authRoutes } from '../modules/auth'

const routes = Router();

routes.use(authRoutes);
routes.use(stateCityRoutes);
routes.use(establishmentRoutes);
routes.use(categoryRoutes);

export default routes;
