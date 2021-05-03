import { Op } from "sequelize";

import AddressClient from "@core/address-client";
import Establishment from "@core/establishment";
import Order from "@core/order";
import { ServiceResponse } from "@shared/utils/service-response";
import { ListOrdersDto } from '../../dtos/list-orders-types.dto';

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
          payment: 'Dinheiro' || 'Cartão de crédito' || 'Cartão de débidto',
          order_status: 'Aberto' || 'Em andamento' || 'Finalizado' || 'Cancelado',
          address_id: { [Op.ne]: null },
        },
        include: [
          {
            model: AddressClient,
            as: 'address_client',
            attributes: ['id', 'client_id', 'nickname', 'street', 'number', 'neighborhood', 'cep', 'city_id'],
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
