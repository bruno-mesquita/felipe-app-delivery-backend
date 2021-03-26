import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import Establishment from '@core/establishment';
import EstablishmentRepository from '../../establishment.repository';
import CategoryRepository from '../../../category/category.repository';
import { CityRepository } from '../../../city/city.repository';

interface ListEstablishment {
  categoryId: string;
  cityId: string;
}

export class ListEstablishmentService {
  async execute(list: ListEstablishment): Promise<ServiceResponse<Establishment[]>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);
      const categoryRepository = getCustomRepository(CategoryRepository);
      const cityRepository = getCustomRepository(CityRepository);

      // Verificando se existe a cidade

      const city = await cityRepository.findById(list.cityId);

      if (!city) throw new Error('Cidade não encontrada.');

      // Verificando se a category existe
      const category = await categoryRepository.findOne({ where: { id: list.categoryId } });

      if (!category) throw new Error('Categoria não encontrada');

      const stores = await establishmentRepository.findByCategory(list.categoryId);

      return { err: null, result: stores };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
