import Category from '@core/category';
import ApiError from '@shared/utils/ApiError';

export class ListCategoriesService {
  async execute(): Promise<Category[]> {
    try {
      return await Category.findAll({ attributes: ['id', 'name'] });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
