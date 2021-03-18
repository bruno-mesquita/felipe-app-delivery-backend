import { Router } from 'express';

import { establishmentRoutes } from '../modules/establishment';
import { establishmentCategoryRoutes } from '../modules/establishment-category';

const routes = Router();

routes.use(establishmentRoutes);
routes.use(establishmentCategoryRoutes);

export default routes;
