import Address from '@core/address';

class AddressRepository {
  async findById(id: string) {
    return Address.findOne({ where: { id } });
  }
}

export { AddressRepository };
