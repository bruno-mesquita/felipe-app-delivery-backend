import { Router } from 'express';

import { boletoRoutes } from '../modules/boletos';

const routes = Router();

routes.use(boletoRoutes);

export default routes;
