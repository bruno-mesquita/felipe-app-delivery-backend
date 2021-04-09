import { ServiceResponse } from '@shared/utils/service-response';
import Client from '@core/client';
import City from '@core/city';
import State from '@core/state';

export class ListAddressClientService {
  async execute(userId: string): Promise<ServiceResponse<any>> {
    try {
      const client = await Client.findByPk(userId);

      if(!client) throw new Error('Cliente não encontrado');

      const adresses = await client.getAdresses({
        attributes: ['id', 'nickname', 'street', 'number', 'neighborhood', 'cep'],
        include: [
          {
            model: City,
            attributes: ['id', 'name'],
            as: 'city',
            include: [
              {
                model: State,
                attributes: ['id', 'name'],
                as: 'state'
              }
            ]
          }
        ]
      });

      return { err: null, result: adresses };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
