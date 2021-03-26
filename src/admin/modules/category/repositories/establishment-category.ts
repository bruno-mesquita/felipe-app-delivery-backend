import { EntityRepository, Repository } from 'typeorm';

import establishmentCategory from '@core/establishment-category';

@EntityRepository(establishmentCategory)
export class EstablishmentCategoryRepository extends Repository<establishmentCategory> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }
}
