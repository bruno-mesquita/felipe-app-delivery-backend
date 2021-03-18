import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import Establishment from '@core/establishment';
import EstablishmentRepository from '../../establishment.repository';
import EstablishmentCategoryRepository from '../../../establishment-category/establishment-category.repository';

class ListEstablishmentService {
  async execute(categoryId: string): Promise<ServiceResponse<Establishment[]>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);
      const establishmentCategoryRepository = getCustomRepository(EstablishmentCategoryRepository);

      // Verificando se a category existe
      const category = await establishmentCategoryRepository.findOne(categoryId);

      if (!category) throw new Error('Categoria não encontrada');

      const stores = await establishmentRepository.findByCategory(categoryId);

      return { err: null, result: stores };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}

export default ListEstablishmentService;
