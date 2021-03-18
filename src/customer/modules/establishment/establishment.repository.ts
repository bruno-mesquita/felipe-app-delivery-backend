import { Repository, EntityRepository } from 'typeorm';

import Establishment from '@core/establishment';

@EntityRepository(Establishment)
class EstablishmentRepository extends Repository<Establishment> {
  async findByCategory(categoryId: string) {
    try {
      return this.find({ where: { category: categoryId }, relations: ['image'] });
    } catch (err) {
      return [];
    }
  }
}

export default EstablishmentRepository;
