import { getCustomRepository } from 'typeorm';

import Category from '@core/category';
import { ServiceResponse } from '@shared/utils/service-response';
import { CategoryRepository } from '../../category-repository';

export class ListCategoriesService {
  async execute(): Promise<ServiceResponse<Category[] | null>> {
    try {
      const categoryRepository = getCustomRepository(CategoryRepository);

      const result = await categoryRepository.find({ select: ['id', 'name'] });

      return { result, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
