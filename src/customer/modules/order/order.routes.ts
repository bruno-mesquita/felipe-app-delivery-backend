/**
 * @fileoverview Rota exclusivas para pedidos
 * @author Jonatas Rosa Moura
 */

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { Router } from 'express';
import { OrderController } from './controller/order-controller';

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.use(isAuthenticated);
orderRouter.post('/order', orderController.create);
orderRouter.get('/order', orderController.list);
orderRouter.get('/order/:id', orderController.show);
orderRouter.put('/order/:id', orderController.update);

export { orderRouter };
