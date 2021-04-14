import { ServiceResponse } from '@shared/utils/service-response';
import Client from '@core/client';
import City from '@core/city';
import State from '@core/state';

export class ListAddressClientService {
  async execute(userId: number): Promise<ServiceResponse<any>> {
    try {
      const client = await Client.findByPk(userId);

      if(!client) throw new Error('Cliente não encontrado');

      const adresses = (await client.getAdresses({
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
        ]
      })).map((item: any) => ({
        ...item.toJSON(),
        city: item.city.name,
        state: item.city.state.name
      }));

      return { err: null, result: adresses };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
