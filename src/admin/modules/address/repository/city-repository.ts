import { EntityRepository, Repository } from 'typeorm';

import AddressCity from '@core/address-city';

@EntityRepository(AddressCity)
class AddressCityRepository extends Repository<AddressCity> {
  async findById(id: string) {
    return this.findOne({ where: { id, active: true } });
  }

  async findByName(name: string) {
    return this.findOne({ where: { name } });
  }
}

export { AddressCityRepository };
