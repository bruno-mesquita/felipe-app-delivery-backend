import { EntityRepository, Repository } from 'typeorm';

import AddressClient from '@core/address-client';

@EntityRepository(AddressClient)
class ClientAddressRepository extends Repository<AddressClient> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }
}

export { ClientAddressRepository };
