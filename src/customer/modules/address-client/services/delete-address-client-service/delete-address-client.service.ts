import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import { AddressClientRepository } from '../../AddressClientRepository';

export class DeleteAddressClientService {
  async execute(addressClientId: string): Promise<ServiceResponse<boolean>> {
    try {
      const addressClientRepository = getCustomRepository(AddressClientRepository);

      const addressClient = await addressClientRepository.findById(addressClientId);

      if (!addressClient) throw new Error('Endereço não encontrado');

      await addressClientRepository.remove(addressClient);

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}
