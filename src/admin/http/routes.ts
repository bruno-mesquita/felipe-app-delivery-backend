import { Router } from 'express';

import { establishmentRoutes } from '../modules/establishment';
import { establishmentCategoryRoutes } from '../modules/establishment-category';
import { stateCityRoutes } from '../modules/address/state-city.routes';

const routes = Router();

routes.use(stateCityRoutes);
routes.use(establishmentRoutes);
routes.use(establishmentCategoryRoutes);

export default routes;
