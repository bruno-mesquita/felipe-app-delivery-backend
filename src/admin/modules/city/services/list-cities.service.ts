import City from '@core/city';
import ApiError from '@shared/utils/ApiError';

export class ListCitiesService {
  async execute(): Promise<any[]> {
    try {
      return  await City.findAll({
        attributes: ['id', 'name', 'active', 'state'],
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

