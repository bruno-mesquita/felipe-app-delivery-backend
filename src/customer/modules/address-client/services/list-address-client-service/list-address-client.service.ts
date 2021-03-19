import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import AddressClient from '@core/address-client';
import { AddressClientRepository } from '../../AddressClientRepository';

export class ListAddressClientService {
  async execute(userId: string): Promise<ServiceResponse<AddressClient[]>> {
    try {
      const addressClientRepository = getCustomRepository(AddressClientRepository);

      const adresses = await addressClientRepository.findByUserId(userId);

      return { err: null, result: adresses };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
