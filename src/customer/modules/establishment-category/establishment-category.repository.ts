import { EntityRepository, Repository } from 'typeorm';

import EstablishmentCategory from '@core/establishment-category';

@EntityRepository(EstablishmentCategory)
class establishmentCategoryRepository extends Repository<EstablishmentCategory> {
  async findById(id: string): Promise<EstablishmentCategory | undefined> {
    try {
      return this.findOne({ where: { id } });
    } catch (err) {
      return undefined;
    }
  }
}

export default establishmentCategoryRepository;
