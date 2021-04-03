import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateClientAddressDto } from '../../dtos/update-address-client';

export class UpdateAddressClientService {
  async execute({
    nickname,
    cep,
    number,
    street,
    neighborhood,
    id,
    city,
  }: UpdateClientAddressDto): Promise<ServiceResponse<boolean>> {
    try {

      const addressClient = await addressClientRepository.findOne({
        where: { id },
        relations: ['address_id'],
      });

      if (!addressClient) throw new Error('Endereço não encontrado');

      addressClient.setNickname(nickname);

      const cityExists = await cityRepository.findById(city);

      if (!cityExists) throw new Error('Cidade não encontrada');

      const address = addressClient.getAddress();

      address.setCep(cep);
      address.setCity(cityExists);
      address.setNeighborhood(neighborhood);
      address.setNumber(number);
      address.setStreet(street);

      await addressClientRepository.save(addressClient);
      await addressRepository.save(address);

      return { err: null, result: true };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}
