import City from '@core/schemas/city.schema';
import ApiError from '@shared/utils/ApiError';

export class FindOneCityService {
  async execute(cityId: string): Promise<any> {
    try {
      return City.findOne({ _id: cityId }).select(['-createdAt', '-__v', '-updatedAt']);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

