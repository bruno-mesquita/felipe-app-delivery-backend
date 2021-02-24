/**
 * @fileoverview Controller do pedido
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { CreateOrderService } from '../services/create-order-service/create-client.service';
import { ListOrderSerive } from '../services/list-order-service/list-client.service';

export class OrderController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listOrderService = new ListOrderSerive();

      if (!listOrderService) throw new Error('Pedido não encontrado.');

      const order = await listOrderService.execute();

      return res.status(200).json(order);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createOrderService = new CreateOrderService();

      const order = await createOrderService.execute(req.body);

      if (order.err) throw new Error(order.err);

      return res.status(201).json(order);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
