import AddressClient from '@core/address-client';

class AddressClientRepository {
  async findById(id: string) {
    return AddressClient.findOne({ where: { id } });
  }

  async findByUserId(userId: string) {
    try {
      return AddressClient.findAll({
        where: { client_id: userId },
        /* relations: ['address_id', 'address_id.city', 'address_id.city.state'], */
        /* select: ['nickname', 'id', 'address_id'], */
      });
    } catch (err) {
      return [];
    }
  }
}

export { AddressClientRepository };
