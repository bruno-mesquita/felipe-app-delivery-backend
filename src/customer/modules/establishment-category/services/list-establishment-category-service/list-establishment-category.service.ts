import { getCustomRepository } from 'typeorm';

import EstablishmentCategory from '@core/category';
import { ServiceResponse } from '@shared/utils/service-response';
import EstablishmentRepository from '../../establishment-category.repository';

export class ListEstablishmentCategoryService {
  async execute(): Promise<ServiceResponse<EstablishmentCategory[]>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);

      const categories = await establishmentRepository.find({ select: ['name', 'id'] });

      return { result: categories, err: null };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
