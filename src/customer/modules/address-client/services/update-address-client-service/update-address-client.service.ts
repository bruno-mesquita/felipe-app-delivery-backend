import AddressClient from '@core/address-client';
import City from '@core/city';
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

      const addressClient = await AddressClient.findOne({
        where: { id },
      });

      if (!addressClient) throw new Error('Endereço não encontrado');

      addressClient.setNickname(nickname);

      const cityExists = await City.findByPk(city);

      if (!cityExists) throw new Error('Cidade não encontrada');

      addressClient.setCep(cep);
      addressClient.setCityId(city);
      addressClient.setNeighborhood(neighborhood);
      addressClient.setNumber(number);
      addressClient.setStreet(street);

      await addressClient.save();

      return { err: null, result: true };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}
