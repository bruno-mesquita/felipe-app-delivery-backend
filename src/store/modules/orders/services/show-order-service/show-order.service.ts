import AddressClient from "@core/address-client";
import City from "@core/city";
import Client from "@core/client";
import Evaluation from "@core/evaluation";
import ItemOrder from "@core/item-order";
import Menu from "@core/menu";
import Order from "@core/order";
import Product from "@core/product";
import State from "@core/state";
import ApiError from "@shared/utils/ApiError";
import { ServiceResponse } from "@shared/utils/service-response";

export interface IRequest {
  id: number;
  establishmentId: number;
}

export class ShowOrderService {
  async execute({ id, establishmentId }: IRequest): Promise<ServiceResponse<any | null>> {
    try {
      const order = await Order.findOne({
        where: { id, establishment_id: establishmentId },
        attributes: ['id', 'payment', 'total', 'discount', 'transshipment', 'note', 'createdAt', 'client_order_status', 'address_id'],
        include: [
          {
            model: Evaluation,
            as: 'evaluation',
            attributes: ['id', 'value', 'message'],
          },
          {
            model: AddressClient,
            as: 'address_client',
            attributes: ['number', 'street', 'neighborhood', 'cep', 'id'],
            paranoid: false,
            include: [
              {
                model: City,
                as: 'city',
                attributes: ['id','name'],
                include: [{
                  model: State,
                  as: 'state',
                  attributes: ['id', 'name']
                }]
              },
              {
                model: Client,
                as: 'client',
                attributes: ['id', 'name', 'cellphone']
              }
            ]
          }
        ],
      });

      if (!order) throw new ApiError('Pedido não encontrado');

      const itemsOrder = await ItemOrder.findAll({
        where: { order_id: id },
        attributes: ['quantity', 'total'],
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['name'],
            paranoid: false,
            include: [{
              model: Menu,
              as: 'menu',
              attributes: ['name']
            }]
          },
        ],
      });

      return { result: { order, items: itemsOrder }, err: null };
    } catch(err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
