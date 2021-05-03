import { Router } from 'express';

import { OrdersController } from './orders-controllers';

const routesOrders = Router();
const ordersController = new OrdersController();

routesOrders.get('/list-orders-types', ordersController.listFotTypes);

export { routesOrders };
