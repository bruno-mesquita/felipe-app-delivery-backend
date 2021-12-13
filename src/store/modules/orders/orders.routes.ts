import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';
import { OrdersController } from './orders-controllers';

const routesOrders = Router();
const ordersController = new OrdersController();

const middlewares = [isAuthenticated, accessEstablishmentOwner];

routesOrders.get('/orders', ...middlewares, ordersController.list);
routesOrders.get('/orders/:id', ...middlewares, ordersController.show);
routesOrders.put('/orders/:id', ...middlewares, ordersController.update);
routesOrders.put('/orders/:id/cancel', ...middlewares, ordersController.cancel);

export { routesOrders };
