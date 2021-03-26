import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import AddressClient from '@core/address-client';
import { AddressClientRepository } from '../../AddressClientRepository';

export class ListAddressClientService {
  async execute(userId: string): Promise<ServiceResponse<any[]>> {
    try {
      const addressClientRepository = getCustomRepository(AddressClientRepository);

      const adressesClient = await addressClientRepository.findByUserId(userId);

      const adresses = adressesClient.map((addressClient) => {
        const address = addressClient.getAddress();

        const nickname = addressClient.getNickname();

        const street = nickname ? `${address.getStreet()}, ${address.getNumber()}` : 'Não informado';
        const region = nickname
          ? `${address.getCity().getName()}, ${address.getCity().getState().getName()}`
          : 'Não informado';

        return {
          id: addressClient.getId(),
          nickname: nickname || 'Meu endereço',
          street,
          region,
        };
      });

      return { err: null, result: adresses };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
