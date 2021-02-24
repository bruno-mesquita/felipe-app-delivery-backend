import { Router } from 'express';

import { clientRoutes } from './modules/client';

import { authRoutes } from './modules/auth';
import { orderRouter } from './modules/order/order.routes';

const routes = Router();

routes.use('/auth', authRoutes);

routes.use('/client', clientRoutes);

routes.use('/order', orderRouter);

export default routes;
