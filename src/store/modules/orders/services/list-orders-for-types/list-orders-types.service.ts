import { Op } from "sequelize";

import AddressClient from "@core/address-client";
import Establishment from "@core/establishment";
import Order from "@core/order";
import { ServiceResponse } from "@shared/utils/service-response";
import { ListOrdersDto } from '../../dtos/list-orders-types.dto';
import State from "@core/state";
import City from "@core/city";
import Client from "@core/client";

export class ListOrdersForTypesServices {
  static LIMIT = 15;

  async execute({ page, id }: ListOrdersDto): Promise<ServiceResponse<Order[]>> {
    try {
      const limit = ListOrdersForTypesServices.LIMIT;
      const offset = ListOrdersForTypesServices.LIMIT * page || 0;

      const establishment = await Establishment.findByPk(id);

      if (!establishment) throw new Error('Estabelecimento não encontrado');

      const orders = await establishment.getOrders({
        where: {
          order_status: { [Op.or]: ['Cancelado', 'Recebido'] },
        },
        attributes: ['id', 'payment', 'total', 'order_status', 'createdAt'],
        include: [
          {
            model: AddressClient,
            as: 'address_client',
            attributes: ['id', 'street', 'number', 'neighborhood', 'cep', 'city_id'],
            include: [
              {
                model: Client,
                as: 'client',
                attributes: ['name', 'cellphone'],
              },
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

      return { result: orders, err: null };
    } catch(err) {
      return { result: [], err: err.message };
    }
  }
}
