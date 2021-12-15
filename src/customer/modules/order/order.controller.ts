/**
 * @fileoverview Controller do pedido
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';

import { CreateOrderService } from './services/create-order-service/create-order.service';
import { ShowOrderService } from './services/show-order-service/show-order.service';
import { VerifyStatusOrderService } from './services/verify-status-order-service/verify-status-order.service';
import Controller from '@shared/utils/controller';

class OrderController extends Controller {
  constructor() {
    super();

    this.verify = this.verify.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
  }

  async verify({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;
      const verifyStatusOrderService = new VerifyStatusOrderService();

      const order = await verifyStatusOrderService.execute(Number(id));

      if (!order) throw new Error(order.err);

      return res.json(order);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async show({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;
      const showOrderService = new ShowOrderService();

      const order = await showOrderService.execute(Number(id));

      if (order.err) throw new Error(order.err);

      return res.json(order);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async create({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const createOrderService = new CreateOrderService();

      const order = await createOrderService.execute({ ...body, client_id: client.id });

      if (order.err) throw new Error(order.err);

      return res.status(201).json(order);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default OrderController;
