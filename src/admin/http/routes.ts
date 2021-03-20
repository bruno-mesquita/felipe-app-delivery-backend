import { stateCityRoutes } from '@admin/modules/address/state-city.routes';
import { Router } from 'express';

import { establishmentRoutes } from '../modules/establishment';
import { establishmentCategoryRoutes } from '../modules/establishment-category';

const routes = Router();

routes.use(stateCityRoutes);
routes.use(establishmentRoutes);
routes.use(establishmentCategoryRoutes);

export default routes;
