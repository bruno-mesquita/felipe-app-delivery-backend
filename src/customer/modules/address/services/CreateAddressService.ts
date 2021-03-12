import { getCustomRepository } from 'typeorm';

import Address from '@core/address';
import { ServiceResponse } from '@shared/utils/service-response';
import { AddressCityRepository } from '@admin/modules/address/repository/CityRepository';
import { ClientAddressDto } from '../dtos/create-address-dto';
import { AddressRepository } from '../repository/AddressRepository';
import { schema } from '../validation/create-address.validation';

class CreateAddressService {
  async execute(createAddressDto: ClientAddressDto): Promise<ServiceResponse<Address | null>> {
    try {
      const addressRepository = getCustomRepository(AddressRepository);
      const cityRepository = getCustomRepository(AddressCityRepository);

      // Fazendo validação DTO

      const valid = schema.isValidSync(createAddressDto);

      if (!valid) throw new Error('[Erro: Endereço] Por favor reveja seus dados');

      // Verificando se a cidade existe no banco

      const cityExists = await cityRepository.findById(createAddressDto.city);

      if (!cityExists) throw new Error('[ERRO: Endereço] Cidade selecionada não existe no sistema');

      // criando classe

      const address = addressRepository.create({
        ...createAddressDto,
        city: cityExists,
      });

      // Salvando no Banco de dados

      console.log(address);

      await addressRepository.save(address);

      return { result: address, err: null };
    } catch (err) {
      return { result: err, err: err.message };
    }
  }
}

export { CreateAddressService };
