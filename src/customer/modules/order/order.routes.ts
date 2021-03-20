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
orderRouter.post('/orders', orderController.create);
orderRouter.get('/orders', orderController.list);
orderRouter.get('/orders/:id', orderController.show);
orderRouter.put('/orders/:id', orderController.update);

export { orderRouter };
