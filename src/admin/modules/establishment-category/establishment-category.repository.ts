import { EntityRepository, Repository } from 'typeorm';

import EstablishmentCategory from '@core/establishment-category';

@EntityRepository(EstablishmentCategory)
class EstablishmentCategoryRepository extends Repository<EstablishmentCategory> {}

export { EstablishmentCategoryRepository };
