import { getCustomRepository } from 'typeorm';

import AddressClient from '@core/address-client';
import { ServiceResponse } from '@shared/utils/service-response';
import { AddressRepository } from '@customer/modules/state';
import { AddressClientRepository } from '../../AddressClientRepository';
import ClientRepository from '../../../client/client.repository';
import { ClientAddressDto } from '../../dtos/create-address-client';
import { schema } from '../../validations/create-address-client';
import { CityRepository } from '../../../city';

export class CreateAddressClientService {
  async execute(createAddressDto: ClientAddressDto): Promise<ServiceResponse<AddressClient | null>> {
    try {
      const clientAddressRepository = getCustomRepository(AddressClientRepository);
      const clientRepository = getCustomRepository(ClientRepository);
      const addressRepository = getCustomRepository(AddressRepository);
      const cityRepository = getCustomRepository(CityRepository);

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
      await addressRepository.save(address);

      // Verificando se o cliente existe
      const clientExists = await clientRepository.findById(createAddressDto.userId);

      if (!clientExists) throw new Error('[ERRO CLIENTE]: Cliente não existe no sistema!');

      // Criando classe
      const clientAddress = clientAddressRepository.create({
        ...createAddressDto,
        client_id: clientExists,
        address_id: address,
      });

      // Salvando no Banco de dados
      await clientAddressRepository.save(clientAddress);

      return { result: clientAddress, err: null };
    } catch (err) {
      return { result: err, err: err.message };
    }
  }
}