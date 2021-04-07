import Category from '@core/category';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListCategoryService {
  async execute(): Promise<ServiceResponse<Category[]>> {
    try {
      const result = await Category.findAll({ attributes: ['name', 'id'] });

      return { result, err: null };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
