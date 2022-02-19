import City from '@core/city';
import ApiError from '@shared/utils/ApiError';

export class ListCitiesByStateService {
  async execute(stateId: string): Promise<City[]> {
    try {
      return City.findAll({ where: { state_id: stateId }, attributes: ['id', 'name'] });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

