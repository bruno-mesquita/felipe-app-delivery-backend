import { Router } from 'express';

import clientRoutes from '@customer/routes';
import storeRoutes from '@store/routes';

const routes = Router();

routes.use('/app', clientRoutes);
routes.use('/store', storeRoutes);

export default routes;
