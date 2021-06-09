import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';
import { OrdersController } from './orders-controllers';

const routesOrders = Router();
const ordersController = new OrdersController();

const middlewares = [isAuthenticated, accessEstablishmentOwner];

routesOrders.get('/list-orders-types', ...middlewares, ordersController.listFotTypes);
routesOrders.get('/show-order/:id', ...middlewares, ordersController.showOrder);
routesOrders.put('/update-status-order/:id', ...middlewares, ordersController.updateOrderStatus);
routesOrders.put('/cancel-order/:id', ...middlewares, ordersController.cancelOrder);

export { routesOrders };
