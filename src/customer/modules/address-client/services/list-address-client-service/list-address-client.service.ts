import { ServiceResponse } from '@shared/utils/service-response';
import Client from '@core/client';
import City from '@core/city';
import State from '@core/state';
import { usePage } from '@shared/utils/use-page';

export class ListAddressClientService {
  async execute(userId: number, page = 0): Promise<ServiceResponse<any>> {
    try {
      const { limit, offset } = usePage(page);

      const client = await Client.findByPk(userId);

      if(!client) throw new Error('Cliente não encontrado');

      const adresses = await client.getAdresses({
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
      })

      return { err: null, result: adresses };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
