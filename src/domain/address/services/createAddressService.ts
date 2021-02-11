import { getCustomRepository } from 'typeorm';

import Address from '../typeorm/entities/address.entity';
import AddressRepository from '../typeorm/repositories/addressRepository';

interface IRequest {
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  cep: number;
}

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
