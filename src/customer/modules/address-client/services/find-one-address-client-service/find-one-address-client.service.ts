import AddressClient from '@core/address-client';
import City from '@core/city';
import State from '@core/state';
import { ServiceResponse } from '@shared/utils/service-response';

export class FindOneAddressClientService {
  async execute(id: number, userId: number): Promise<ServiceResponse<any>> {
    try {
      const address = await AddressClient.findOne({
        where: { id, client_id: userId },
        attributes: { exclude: ['createdAt', 'updatedAt', 'client_id'] },
        include: [
          {
            model: City,
            as: 'city',
            attributes: ['id'],
            include: [{
              model: State,
              as: 'state',
              attributes: ['id'],
            }]
          }
        ]
      });

      if(!address) throw new Error('Endereço não encontrado')


      const result: any = {};

      Object.entries(address.toJSON()).map(e => {
        if(e[0] !== 'city_id') {
          if(e[0] === 'city') {
            result['city'] = e[1].id;
            result['state'] = e[1].state.id
          } else {
            result[e[0]] = e[1];
          }
        }
      });

      return { err: null, result };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
