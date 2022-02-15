import City from '@core/schemas/city.schema';
import ApiError from '@shared/utils/ApiError';

export class ListCitiesService {
  async execute(): Promise<any[]> {
    try {
      return  await City.find().select(['name', 'active', 'state', 'neighborhoods']).populate({ path: 'state', select: ['name'] });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

