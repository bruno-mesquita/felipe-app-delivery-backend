import City from '@core/schemas/city.schema';
import ApiError from '@shared/utils/ApiError';

export class ListCitiesByStateService {
  async execute(stateId: string): Promise<any[]> {
    try {
      return City.find({ state: stateId }).select(['name']);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

