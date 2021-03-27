import { EntityRepository, Repository } from 'typeorm';

import EstablishmentCategory from '@core/establishment-category';

@EntityRepository(EstablishmentCategory)
export class EstablishmentCategoryRepository extends Repository<EstablishmentCategory> {}
