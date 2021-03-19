/**
 * @fileoverview Rota exclusivas para pedidos
 * @author Jonatas Rosa Moura
 */

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { OrderController } from './controller/order-controller';

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.use(isAuthenticated);
<<<<<<< HEAD
orderRouter.post('/order', orderController.create);
orderRouter.get('/order', orderController.list);
orderRouter.get('/order/:id', orderController.show);
orderRouter.put('/order/:id', orderController.update);
=======
orderRouter.post('/orders', orderController.create);
orderRouter.get('/orders', orderController.list);
orderRouter.get('/orders/:id', orderController.show);
orderRouter.put('/orders/:id', orderController.update);
>>>>>>> 83688acf43dde3aff98a23146ea4116c73eb3dda

export { orderRouter };
