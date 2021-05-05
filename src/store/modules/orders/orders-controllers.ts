import { Request, Response } from "express";
import { ShowOrderService } from "@store/modules/orders/services/show-order-service/show-order.service";
import { ListOrdersForTypesServices } from "./services/list-orders-for-types/list-orders-types.service";

export class OrdersController {
  async showOrder(req: Request, res: Response): Promise<Response> {
    try {
      const showOrderService = new ShowOrderService();

      const showOrder = await showOrderService.execute({ id: Number(req.params.id), clientId: req.client.id });

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
}
