import { EntityRepository, Repository } from 'typeorm';

import AddressClient from '@core/address-client';

@EntityRepository(AddressClient)
class AddressClientRepository extends Repository<AddressClient> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }

  async findByUserId(userId: string) {
    try {
      return this.find({ where: { client_id: userId }, relations: ['address_id'] });
    } catch (err) {
      return [];
    }
  }
}

export { AddressClientRepository };
