import AddressClient from '@core/address-client';
import { ServiceResponse } from '@shared/utils/service-response';

export class DeleteAddressClientService {
  async execute(addressClientId: number): Promise<ServiceResponse<boolean>> {
    try {
      const addressClient = await AddressClient.findByPk(addressClientId);

      if (!addressClient) throw new Error('Endereço não encontrado');

      await addressClient.destroy();

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}
