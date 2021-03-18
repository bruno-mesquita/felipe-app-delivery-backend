import { getCustomRepository } from 'typeorm';

import EstablishmentCategory from '@core/establishment-category';
import { ServiceResponse } from '@shared/utils/service-response';
import EstablishmentRepository from '../../establishment-category.repository';

export class CreateEstablishmentCategoryService {
  async execute(categoryDto: { name: string }): Promise<ServiceResponse<boolean>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);

      const category = establishmentRepository.create(categoryDto);

      await establishmentRepository.save(category);

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: {} as any };
    }
  }
}
