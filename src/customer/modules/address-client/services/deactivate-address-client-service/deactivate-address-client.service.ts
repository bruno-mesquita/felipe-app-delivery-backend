import AddressClient from '@core/address-client';
import { ServiceResponse } from '@shared/utils/service-response';

export class DeactivateAddressClientService {
  async execute(id: number, userId: number): Promise<ServiceResponse<boolean>> {
    try {
      const adresses = await AddressClient.findAll({ where: { client_id: userId }, attributes: ['id'] });

      if(adresses.length <= 1) throw new Error('Você não pode desativar essa endereço');

      const address = await AddressClient.findOne({
        where: { id, active: true, client_id: userId },
        attributes: ['id'],
      });

      if(!address) throw new Error('Endereço não encontrado')

      address.deactivate();
      await address.save();

      return { err: null, result: true };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}
