import { EntityRepository, Repository } from 'typeorm';

import Address from '@core/address';

@EntityRepository(Address)
class AddressRepository extends Repository<Address> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }
}

export { AddressRepository };
