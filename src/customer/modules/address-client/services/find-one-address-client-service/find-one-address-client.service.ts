import { ServiceResponse } from '@shared/utils/service-response';

export class FindOneAddressClientService {
  async execute(id: string): Promise<ServiceResponse<any>> {
    try {
      const addressClientRepository = getCustomRepository(AddressClientRepository);

      const adressesClient = await addressClientRepository.findOne({
        where: { id },
        relations: ['address_id', 'address_id.city', 'address_id.city.state'],
      });

      if (!adressesClient) throw new Error('Endereço não encontrado');

      const address = adressesClient.getAddress();

      const result = {
        id: adressesClient.getId(),
        nickname: adressesClient.getNickname(),
        cep: address.getCep(),
        street: address.getStreet(),
        neighborhood: address.getNeighborhood(),
        number: address.getNumber(),
        city: address.getCity().getId(),
        state: address.getCity().getState().getId(),
      };

      return { err: null, result };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
