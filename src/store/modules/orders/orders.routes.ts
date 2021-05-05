import { Router } from 'express';

import { OrdersController } from './orders-controllers';

const routesOrders = Router();
const ordersController = new OrdersController();

routesOrders.get('/list-orders-types', ordersController.listFotTypes);
routesOrders.get('/show-order/:id', ordersController.showOrder);
routesOrders.put('/update-status-order/:id', ordersController.updateOrderStatus);
routesOrders.put('/cancel-order/:id', ordersController.cancelOrder);

export { routesOrders };
