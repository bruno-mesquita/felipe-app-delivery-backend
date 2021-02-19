import { Router } from 'express';

import { productRoutes } from './modules/product';

const routes = Router();

routes.use(productRoutes);

export default routes;
