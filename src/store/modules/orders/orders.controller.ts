import type { Request, Response } from 'express';
import { ShowOrderService } from '@store/modules/orders/services/show-order-service/show-order.service';
import Controller from '@shared/utils/controller';
import { ListOrdersForTypesServices } from './services/list-orders-for-types/list-orders-types.service';
import { UpdateOrderStatusServices } from './services/update-order-status/update-order-status.service';
import { CancelOrderService } from './services/cancel-order/cancel-order.service';

class OrderController extends Controller {
  constructor() {
    super();

    this.show = this.show.bind(this);
    this.list = this.list.bind(this);
    this.cancel = this.cancel.bind(this);
    this.update = this.update.bind(this);
  }

  async show({ params, client }: Request, res: Response): Promise<Response> {
    try {
      const establishmentId = client.entity.getEstablishmentId();

      const showOrderService = new ShowOrderService();

      const showOrder = await showOrderService.execute({
        id: Number(params.id),
        establishmentId,
      });

      return res.json(showOrder);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async list({ client, query }: Request, res: Response): Promise<Response> {
    try {
      const { page = 0, types } = query;

      const listOrdersForTypesServices = new ListOrdersForTypesServices();

      const establishmentId = client.entity.getEstablishmentId();

      const listOrders = await listOrdersForTypesServices.execute({
        id: establishmentId,
        types: types as any,
        page: Number(page),
      });

      return res.status(200).json(listOrders);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async cancel({ params, client }: Request, res: Response): Promise<Response> {
    try {
      const cancelOrderService = new CancelOrderService();

      const establishmentId = client.entity.getEstablishmentId();

      const order = await cancelOrderService.execute({
        id: Number(params.id),
        establishmentId,
      });

      return res.status(200).json(order);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async update({ client, params }: Request, res: Response): Promise<Response> {
    try {
      const updateOrderService = new UpdateOrderStatusServices();

      const establishmentId = client.entity.getEstablishmentId();

      const order = await updateOrderService.execute({
        id: Number(params.id),
        establishmentId,
      });

      return res.status(200).json(order);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default OrderController;
