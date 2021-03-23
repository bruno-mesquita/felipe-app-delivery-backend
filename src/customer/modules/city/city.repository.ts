import { EntityRepository, Repository } from 'typeorm';

import City from '@core/address-city';
@EntityRepository(City)
export class CityRepository extends Repository<City> {
  async findById(id: string): Promise<City | undefined> {
    try {
      return this.findOne({ where: { id } });
    } catch (err) {
      return undefined;
    }
  }
}
