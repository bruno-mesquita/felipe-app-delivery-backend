import Category, { type ICategory } from '@core/schemas/category.schema';
import ApiError from '@shared/utils/ApiError';

export class ListCategoriesService {
  async execute(): Promise<ICategory[]> {
    try {
      return await Category.find({}).select(['name']);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
