import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';
import OrderController from './orders.controller';

const routes = Router();
const orderController = new OrderController();

const middlewares = [isAuthenticated, accessEstablishmentOwner];

routes.get('/orders', ...middlewares, orderController.list);
routes.get('/orders/:id', ...middlewares, orderController.show);
routes.put('/orders/:id', ...middlewares, orderController.update);
routes.put('/orders/:id/cancel', ...middlewares, orderController.cancel);

export default routes;
