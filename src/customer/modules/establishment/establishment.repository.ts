import { Repository, EntityRepository } from 'typeorm';

import Establishment from '@core/establishment';

@EntityRepository(Establishment)
class EstablishmentRepository extends Repository<Establishment> {
  async findByCategory(categoryId: string) {
    try {
      return this.find({
        where: { category: categoryId, active: true },
        relations: ['image'],
        select: ['name', 'image', 'openingTime', 'closingTime'],
      });
    } catch (err) {
      return [];
    }
  }

  async findById(id: string) {
    try {
      return this.findOne({
        where: { id },
      });
    } catch (err) {
      return null;
    }
  }
}

export default EstablishmentRepository;
