import { Request, Response } from "express";
import { ListOrdersForTypesServices } from "./services/list-orders-for-types/list-orders-types.service";

export class OrdersController {
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
