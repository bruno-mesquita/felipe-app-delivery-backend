import AddressClient from "@core/address-client";
import Order from "@core/order";
import { ServiceResponse } from "@shared/utils/service-response";
import { ListOrdersDto } from '../../dtos/list-orders-types.dto';
import State from "@core/state";
import City from "@core/city";
import Client from "@core/client";
import { createPagination } from "@shared/utils/use-page";
import ApiError from "@shared/utils/ApiError";

export class ListOrdersForTypesServices {
  async execute({ page = 0, id, types }: ListOrdersDto): Promise<ServiceResponse<Order[]>> {
    try {
      const { limit, offset } = createPagination(page);

      // const valid = schema.isValidSync({ page, id, types });

      // if (!valid) throw new ApiError('Dados inválidos');

      const orders = await Order.findAll({
        where: {
          establishment_id: id,
          client_order_status: JSON.parse(types as any),
        },
        attributes: ['id', 'payment', 'total', 'createdAt', 'client_order_status'],
        include: [
          {
            model: AddressClient,
            as: 'address_client',
            attributes: ['id', 'street', 'number', 'neighborhood', 'cep', 'city_id'],
            paranoid: false,
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
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
