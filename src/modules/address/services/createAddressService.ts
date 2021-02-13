/**
 * @fileoverview Criação de serviço para criar um endereço
 *
 * @author Jonatas
 */

import { getCustomRepository } from 'typeorm';

import Address from '../typeorm/entity/address.entity';
import AddressRepository from '../typeorm/repositories/address.repository';
import { IRequest } from './types';

export default class CreateAddressService {
  public async execute({
    street,
    number,
    neighborhood,
    city,
    cep,
  }: IRequest): Promise<Address> {
    const addressRepository = getCustomRepository(AddressRepository);

    const address = addressRepository.create({
      street,
      number,
      neighborhood,
      city,
      cep,
    });

    await addressRepository.save(address);

    return address;
  }
}
