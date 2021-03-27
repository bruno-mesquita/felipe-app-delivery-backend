import { getCustomRepository } from 'typeorm';

import Category from '@core/category';
import { ServiceResponse } from '@shared/utils/service-response';
import CategoryRepository from '../../category-establishment.repository';

export class ListCategoryService {
  async execute(): Promise<ServiceResponse<Category[]>> {
    try {
      const categoryRepository = getCustomRepository(CategoryRepository);

      const categories = await categoryRepository.find({ select: ['name', 'id'] });

      return { result: categories, err: null };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
