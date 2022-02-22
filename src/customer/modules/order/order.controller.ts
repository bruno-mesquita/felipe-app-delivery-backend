/**
 * @fileoverview Controller do pedido
 * @author Jonatas Rosa Moura, Bruno Mesquita
 */

import type { Request, Response } from 'express';

import { CreateOrderService } from './services/create-order-service/create-order.service';
import { ShowOrderService } from './services/show-order-service/show-order.service';
import { VerifyStatusOrderService } from './services/verify-status-order-service/verify-status-order.service';
import Controller from '@shared/utils/controller';

class OrderController extends Controller {
  private readonly createOrderService: CreateOrderService;
  private readonly verifyStatusOrderService: VerifyStatusOrderService;
  private readonly showOrderService: ShowOrderService;

  constructor() {
    super();

    this.createOrderService = new CreateOrderService();
    this.verifyStatusOrderService = new VerifyStatusOrderService();
    this.showOrderService = new ShowOrderService();

    this.verify = this.verify.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
  }

  async verify({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;
      const result = await this.verifyStatusOrderService.execute(Number(id));

      return res.json({ result });
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async show({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;

      const result = await this.showOrderService.execute(Number(id));

      return res.json({ result });
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async create({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const response = await this.createOrderService.execute({ ...body, client_id: client.id });

      return res.status(201).json({ result: response });
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default OrderController;
