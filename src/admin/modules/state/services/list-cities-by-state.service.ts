import City from '@core/city';
import State from '@core/state';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListCitiesByStatesService {
  async execute(stateId: number): Promise<ServiceResponse<City[]>> {
    try {
      const cities = await City.findAll({
        where: { state_id: stateId },
        attributes: ['id', 'name', 'active'],
        include: [
          {
            model: State,
            as: 'state',
            attributes: ['name']
          }
        ]
      });

      return { result: cities, err: null };
    } catch (err) {
      return { result: [], err: err.message };
    }
  }
}

