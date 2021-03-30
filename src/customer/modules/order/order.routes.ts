/**
 * @fileoverview Rota exclusivas para pedidos
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { OrderController } from './order-controller';

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.use(isAuthenticated);
orderRouter.post('/orders', orderController.create);
orderRouter.get('/orders/:id', orderController.show);
orderRouter.get('/orders/:id/verify', orderController.verify);

export { orderRouter };
