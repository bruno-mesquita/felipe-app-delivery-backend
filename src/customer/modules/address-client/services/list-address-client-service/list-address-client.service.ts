import City from '@core/city';
import State from '@core/state';
import { createPagination } from '@shared/utils/use-page';
import AddressClient from '@core/address-client';
import ApiError from '@shared/utils/ApiError';
import Neighborhood from '@core/neighborhood';

export class ListAddressClientService {
  async execute(clientId: number, page = 0): Promise<any[]> {
    try {
      const { limit, offset } = createPagination(page);

      const adresses = await AddressClient.findAll({
        where: { client_id: clientId },
        attributes: ['id', 'nickname', 'street', 'number', 'neighborhood', 'cep', 'active', 'neighborhoodId'],
        include: [
          {
            model: Neighborhood,
            as: 'district',
            attributes: ['name'],
          },
          {
            model: City,
            attributes: ['name'],
            as: 'city',
            include: [
              {
                model: State,
                attributes: ['name'],
                as: 'state',
              },
            ],
          },
        ],
        limit,
        offset,
      });

      return adresses;
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
