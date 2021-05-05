import { Request, Response } from "express";
import { ShowOrderService } from "@store/modules/orders/services/show-order-service/show-order.service";
import { ListOrdersForTypesServices } from "./services/list-orders-for-types/list-orders-types.service";
import { UpdateOrderStatusServices } from "./services/update-order-status/update-order-status.service";

export class OrdersController {
  async showOrder(req: Request, res: Response): Promise<Response> {
    try {
      const showOrderService = new ShowOrderService();

      const showOrder = await showOrderService.execute({ ...req.body, id: req.client.id });

      if (showOrder.err) throw new Error(showOrder.err);

      return res.status(200).json(showOrder);
    } catch(err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async listFotTypes(req: Request, res: Response): Promise<Response> {
    try {
      const listOrdersForTypesServices = new ListOrdersForTypesServices();

      const listOrders = await listOrdersForTypesServices.execute({ ...req.body, id: req.client.id });

      if (listOrders.err) throw new Error(listOrders.err);

      return res.status(200).json(listOrders);
    } catch(err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<Response> {
    try {
      const updateOrderService = new UpdateOrderStatusServices();

      const order = await updateOrderService.execute({ ...req.body, id: req.client.id });

      if (order.err) throw new Error(order.err);

      return res.status(200).json(order);
    } catch(err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
