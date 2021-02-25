/**
 * @fileoverview Controller do pedido
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { CreateOrderService } from '../services/create-order-service/create-client.service';
import { ListOrderSerive } from '../services/list-order-service/list-client.service';
import { ShowOrderService } from '../services/show-order-service/show-order.service';
import { UpdateOrderservice } from '../services/cancel-order-service/update-order.service';

export class OrderController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listOrderService = new ListOrderSerive();

      if (!listOrderService) throw new Error('Lista pedidos não encontrada.');

      const order = await listOrderService.execute();

      return res.status(200).json(order);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const showOrderService = new ShowOrderService();

      if (!showOrderService) throw new Error('Pedido não encontrada.');

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

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateOrderService = new UpdateOrderservice();

      const order = await updateOrderService.execute({ ...req.body, id });

      if (order.err) throw new Error(order.err);

      return res.status(201).json(order);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
