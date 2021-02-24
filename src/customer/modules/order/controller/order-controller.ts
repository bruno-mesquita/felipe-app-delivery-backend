/**
 * @fileoverview Controller do pedido
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { CreateOrderService } from '../services/create-client-service/create-client.service';

export class OrderController {
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
