import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';

import OrderController from './order.controller';

const routes = Router();
const orderController = new OrderController();

const middlewares = [isAuthenticated, accessClient];

routes.post('/orders', ...middlewares, orderController.create);
routes.get('/orders/:id', ...middlewares, orderController.show);
routes.get('/orders/:id/verify', ...middlewares, orderController.verify);

export default routes;
