import City from '@core/city';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListCitiesByStatesService {
  async execute(state_id: string): Promise<ServiceResponse<any[]>> {
    try {
      const result = await City.findAll({
        where: {
          state_id,
        },
        attributes: ['id', 'name'],
      });

      return { result, err: null };
    } catch (err) {
      throw ApiError.generateErrorUnknown();
    }
  }
}
