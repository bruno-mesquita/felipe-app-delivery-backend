import { EntityRepository, Repository } from 'typeorm';

import AddressClient from '@core/address-client';

@EntityRepository(AddressClient)
class AddressClientRepository extends Repository<AddressClient> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }
}

export { AddressClientRepository };
