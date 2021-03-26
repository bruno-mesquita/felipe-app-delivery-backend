import { EntityRepository, Repository } from 'typeorm';

import EstablishmentCategory from '@core/establishment-category';

@EntityRepository(EstablishmentCategory)
class CategoryRepository extends Repository<EstablishmentCategory> {}

export { CategoryRepository };
