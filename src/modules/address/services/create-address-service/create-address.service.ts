/**
 * @fileoverview Criação de serviço para criar um endereço
 *
 * @author Jonatas Rosa Moura
 */

import { getCustomRepository } from 'typeorm';

import { CreateAddressDto } from '@modules/address/dtos/create-address-dto';
import { ServiceResponse } from '@shared/utils/service-response';
import Address from '../../typeorm/entity/address.entity';
import AddressRepository from '../../typeorm/repositories/address.repository';
import createAddressSchema from '../../validation/create-address.validation';

export default class CreateAddressService {
  async execute(createAddress: CreateAddressDto): Promise<ServiceResponse<Address | null>> {
    try {
      const addressRepository = getCustomRepository(AddressRepository);

      // Fazendo validação do DTO

      const valid = createAddressSchema.isValidSync(createAddress);

      if (!valid) throw new Error('Por favor reveja seus dados.');

      // Criando a classe
      const address = addressRepository.create(createAddress);

      // Salvando no db
      await addressRepository.save(address);

      return { result: address, err: null };
    } catch (err) {
      return { err: null, result: err.message };
    }
  }
}
