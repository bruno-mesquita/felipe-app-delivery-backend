import City from '@core/city';
import State from '@core/state';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListCitiesService {
  async execute(): Promise<ServiceResponse<City[]>> {
    try {
      const cities = await City.findAll({
        attributes: ['id', 'name', 'active'],
        include: [
          {
            model: State,
            as: 'state',
            attributes: ['id', 'name']
          }
        ]
      });

      return { result: cities, err: null };
    } catch (err) {
      return { result: [], err: err.message };
    }
  }
}

