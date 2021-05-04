import { Op } from "sequelize";
import AddressClient from "@core/address-client";
import City from "@core/city";
import Establishment from "@core/establishment";
import Order from "@core/order";
import State from "@core/state";
import { ServiceResponse } from "@shared/utils/service-response";

export class ListOrderCanceledService {
  static LIMIT = 15;

  async execute(id: number, page?: number): Promise<ServiceResponse<Order[] | null>> {
    try {
      const limit = ListOrderCanceledService.LIMIT;
      const offset = ListOrderCanceledService.LIMIT * page || 0;

      const establishment = await Establishment.findByPk(id);

      if (!establishment) throw new Error('Estabelecimento não encontrado');

      const orderCanceled = await establishment.getOrders({
        where: {
          order_status: 'Cancelado',
          address_id: { [Op.ne]: null },
          payment: 'Dinheiro' || 'Cartão de crédito' || 'Cartão de débidto',
        },
        attributes: ['payment', 'order_status', 'createdAt'],
        include: [
          {
            model: AddressClient,
            as: 'address_client',
            attributes: ['id', 'client_id', 'nickname', 'street', 'number', 'neighborhood', 'cep', 'city_id'],
            include: [
              {
                model: City,
                as: 'city',
                attributes: ['id' ,'name'],
                include: [
                  {
                    model: State,
                    as: 'state',
                    attributes: ['id', 'name'],
                  },
                ],
              },
            ],
          },
        ],
        limit,
        offset,
      });

      return { result: orderCanceled, err: null }
    } catch(err) {
      return { result: [], err: err.message };
    }
  }
}
