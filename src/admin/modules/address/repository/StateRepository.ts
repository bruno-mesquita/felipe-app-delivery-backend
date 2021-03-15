import { EntityRepository, Repository } from 'typeorm';

import AddresState from '@core/address-state';

@EntityRepository(AddresState)
class AddresStateRepository extends Repository<AddresState> {
  async findById(id: string) {
    return this.findOne({ where: { id, active: true } });
  }

  async findByName(name: string) {
    return this.findOne({ where: { name } });
  }

  async findByCities(cities: string) {
    return this.findOne({ where: { cities } });
  }
}

export { AddresStateRepository };
