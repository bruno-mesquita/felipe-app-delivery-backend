import { EntityRepository, Repository } from 'typeorm';

import EstablishmentCategory from '@core/establishment-category';

@EntityRepository(EstablishmentCategory)
class establishmentCategoryRepository extends Repository<EstablishmentCategory> {}

export default establishmentCategoryRepository;
