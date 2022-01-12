import { ServiceResponse } from '@shared/utils/service-response';
import Client from '@core/client';
import City from '@core/city';
import State from '@core/state';
import { createPagination } from '@shared/utils/use-page';
import AddressClient from '@core/address-client';
import ApiError from '@shared/utils/ApiError';

export class ListAddressClientService {
  async execute(userId: number, page = 0): Promise<ServiceResponse<any>> {
    try {
      const { limit, offset } = createPagination(page);

      const client = await Client.findByPk(userId);

      if(!client) throw new ApiError('Cliente não encontrado');

      const adresses = await AddressClient.findAll({
        where: { client_id: client.getId() },
        attributes: ['id', 'nickname', 'street', 'number', 'neighborhood', 'cep', 'active'],
        include: [
          {
            model: City,
            attributes: ['name'],
            as: 'city',
            include: [
              {
                model: State,
                attributes: ['name'],
                as: 'state'
              }
            ]
          }
        ],
        limit,
        offset,
      });

      return { err: null, result: adresses };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
