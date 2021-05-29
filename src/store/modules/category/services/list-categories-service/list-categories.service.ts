import { ServiceResponse } from '@shared/utils/service-response';
import Category from '@core/category';

export class ListCategoriesService {
  async execute(): Promise<ServiceResponse<Category[] | null>> {
    try {
      const categories = await Category.findAll({
        attributes: ['id', 'name'],
      });

      return { result: categories, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
