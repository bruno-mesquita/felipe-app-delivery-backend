import Category from '@core/category';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListCategoryService {
  async execute(): Promise<ServiceResponse<Category[]>> {
    try {
      const result = await Category.findAll({ attributes: ['name', 'id'] });

      return { result, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
