/**
 * @fileoverview Controller do pedido
 * @author Jonatas Rosa Moura, Bruno Mesquita
 */

import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';
import { CreateOrderService } from './services/create-order-service/create-order.service';
import { ShowOrderService } from './services/show-order-service/show-order.service';
import { VerifyStatusOrderService } from './services/verify-status-order-service/verify-status-order.service';

class OrderController extends Controller {
  private readonly createOrderService: CreateOrderService;

  private readonly verifyStatusOrderService: VerifyStatusOrderService;

  private readonly showOrderService: ShowOrderService;

  constructor() {
    super(['verify', 'show', 'create']);

    this.createOrderService = new CreateOrderService();
    this.verifyStatusOrderService = new VerifyStatusOrderService();
    this.showOrderService = new ShowOrderService();
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
      const { establishment_id, address_id, ...rest } = body;

      const response = await this.createOrderService.execute({
        ...rest,
        establishmentId: establishment_id,
        addressId: address_id,
        clientId: client.id,
      });

      return res.status(201).json({ result: response });
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default OrderController;
