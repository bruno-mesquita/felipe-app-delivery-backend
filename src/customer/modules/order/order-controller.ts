/**
 * @fileoverview Controller do pedido
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';

import { CreateOrderService } from './services/create-order-service/create-order.service';
import { ShowOrderService } from './services/show-order-service/show-order.service';
import { VerifyStatusOrderService } from './services/verify-status-order-service/verify-status-order.service';
import { RateOrderService } from './services/rate-order.service';

export class OrderController {
  async verify(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const verifyStatusOrderService = new VerifyStatusOrderService();

      const order = await verifyStatusOrderService.execute(id);

      if (!order) throw new Error(order.err);

      return res.status(200).json(order);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const showOrderService = new ShowOrderService();

      const order = await showOrderService.execute(id);

      if (!order) throw new Error('Pedido inválido.');

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

  async rateOrder(req: Request, res: Response): Promise<Response> {
    try {
      const rateOrderService = new RateOrderService();

      const order = await rateOrderService.execute({ ...req.body, id: req.client.id });

      if (order.err) throw new Error(order.err);

      return res.json(order);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
