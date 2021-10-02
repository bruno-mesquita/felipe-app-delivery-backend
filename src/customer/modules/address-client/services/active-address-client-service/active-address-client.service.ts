import AddressClient from '@core/address-client';
import { ServiceResponse } from '@shared/utils/service-response';

export class ActiveAddressClientService {
  async execute(id: number, userId: number): Promise<ServiceResponse<boolean>> {
    try {
      const addressActive = await AddressClient.findOne({
        where: { active: true, client_id: userId },
        attributes: ['id'],
      });

      if(!addressActive) throw new Error('Endereço não encontrado')

      const address = await AddressClient.findOne({
        where: { id, active: false, client_id: userId },
        attributes: ['id', 'active'],
      });

      if(!address) throw new Error('Endereço não encontrado')

      addressActive.deactivate();
      address.activate();

      await addressActive.save();
      await address.save();

      return { err: null, result: true };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}
