import { getCustomRepository } from 'typeorm';

import Address from '@core/address';
import { ServiceResponse } from '@shared/utils/service-response';
import { ClientAddressDto } from '../dtos/create-address-dto';
import { AddressRepository } from '../repository/AddressRepository';
import { schema } from '../validation/create-address.validation';

class CreateAddressService {
  async execute(createAddressDto: ClientAddressDto): Promise<ServiceResponse<Address | null>> {
    try {
      const addressRepository = getCustomRepository(AddressRepository);

      // Fazendo validação DTO

      const valid = schema.isValidSync(createAddressDto);

      if (!valid) throw new Error('[Erro: Endereço] Por favor reveja seus dados');

      // criando classe

      const address = addressRepository.create(createAddressDto);

      // Salvando no Banco de dados

      await addressRepository.save(address);

      return { result: address, err: null };
    } catch (err) {
      return { result: err, err: err.message };
    }
  }
}

export { CreateAddressService };
