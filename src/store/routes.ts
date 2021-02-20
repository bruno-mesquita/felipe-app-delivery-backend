import { Router } from 'express';

import { productRoutes } from './modules/product';
import { authEstablishmentRoutes } from './modules/auth/auth-establishment.routes';

const routes = Router();

routes.use('/product', productRoutes);
routes.use('/login', authEstablishmentRoutes);

export default routes;
