import { Router } from 'express';

import { clientRoutes } from './modules/client';

const routes = Router();

routes.use(clientRoutes);

export default routes;
