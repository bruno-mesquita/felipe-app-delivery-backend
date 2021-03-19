import { getCustomRepository } from 'typeorm';

import AddressClient from '@core/address-client';
import { ServiceResponse } from '@shared/utils/service-response';
import { AddressClientRepository } from '../../AddressClientRepository';
import { AddressRepository } from '../../../address/AddressRepository';
import ClientRepository from '../../../client/client.repository';
import { CreateAddressClient } from '../../dtos/create-address-client';
import { schema } from '../../validations/create-address-client';

export class CreateAddressClientService {
  async execute(createAddressClientDto: CreateAddressClient): Promise<ServiceResponse<AddressClient | null>> {
    try {
      const clientAddressRepository = getCustomRepository(AddressClientRepository);
      const clientRepository = getCustomRepository(ClientRepository);
      const addressRepository = getCustomRepository(AddressRepository);

      // Fazendo validação DTO

      const valid = schema.isValidSync(createAddressClientDto);

      if (!valid) throw new Error('Por favor reveja seus dados.');

      // Verificando se o cliente existe

      const clientExists = await clientRepository.findById(createAddressClientDto.client_id);

      if (!clientExists) throw new Error('[ERRO CLIENTE]: Cliente não existe no sistema!');

      // // Verificando se o Endereço existe

      const addressExists = await addressRepository.findById(createAddressClientDto.address_id);

      if (!addressExists) throw new Error('[ERRO ENDEREÇO]: Endereço não existe no sistema!');

      // Criando classe

      const clientAddress = clientAddressRepository.create({
        ...createAddressClientDto,
        client_id: clientExists,
        address_id: addressExists,
      });

      // Salvando no Banco de dados

      await clientAddressRepository.save(clientAddress);

      return { result: clientAddress, err: null };
    } catch (err) {
      return { result: err, err: err.message };
    }
  }
}
