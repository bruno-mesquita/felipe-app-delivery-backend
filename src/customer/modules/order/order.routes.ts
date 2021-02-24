/**
 * @fileoverview Rota exclusivas para pedidos
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';
import { OrderController } from './controller/order-controller';

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.post('/', orderController.create);

export { orderRouter };
