import Category from '@core/category';
import ApiError from '@shared/utils/ApiError';

export class ListCategoriesService {
  async execute(): Promise<Category[]> {
    try {
      return Category.findAll({
        attributes: ['id', 'name'],
      });
    } catch (err) {
      throw ApiError.generateErrorUnknown();
    }
  }
}
