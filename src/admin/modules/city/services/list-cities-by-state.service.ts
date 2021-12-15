import City from '@core/city';
import { ServiceResponse } from '@utils/service-response';

export class ListCitiesByStateService {
  async execute(stateId: string): Promise<ServiceResponse<City[]>> {
    try {
      const cities = await City.findAll({
        where: { state_id: stateId },
        attributes: ['id', 'name'],
      });

      return { result: cities, err: null };
    } catch (err) {
      return { result: [], err: err.message };
    }
  }
}

