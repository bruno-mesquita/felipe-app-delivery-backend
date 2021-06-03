import AddressClient from "@core/address-client";
import Establishment from "@core/establishment";
import Order from "@core/order";
import { ServiceResponse } from "@shared/utils/service-response";
import { ListOrdersDto } from '../../dtos/list-orders-types.dto';
import State from "@core/state";
import City from "@core/city";
import Client from "@core/client";
import { schema } from '../../validations/list-orders-types.validation';

export class ListOrdersForTypesServices {
  static LIMIT = 15;

  async execute({ page = 0, id, type }: ListOrdersDto): Promise<ServiceResponse<Order[]>> {
    try {
      const valid = schema.isValidSync({ page, id, type });

      if (!valid) throw new Error('Dados inválidos');

      const limit = ListOrdersForTypesServices.LIMIT;
      const offset = ListOrdersForTypesServices.LIMIT * page;

      const establishment = await Establishment.findByPk(id);

      if (!establishment) throw new Error('Estabelecimento não encontrado');

      const orders = await establishment.getOrders({
        where: {
          order_status: type === 'Aberto' ? [type, 'Em andamento'] : type,
        },
        attributes: ['id', 'payment', 'total', 'order_status', 'createdAt', 'client_order_status'],
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
        order: [['createdAt', 'desc']],
        limit,
        offset,
      });

      return { result: orders, err: null };
    } catch(err) {
      console.log(err);
      return { result: [], err: err.message };
    }
  }
}
