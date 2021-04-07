import City from '@core/city';
import { ServiceResponse } from '@shared/utils/service-response';

class ListCitiesByStatesService {
  async execute(state_id: string): Promise<ServiceResponse<any[]>> {
    try {
      const result = await City.findAll({
        where: {
          state_id,
        },
        attributes: ['id', 'name']
      });

      return { result, err: null };
    } catch (err) {
      return { result: [], err: err.message };
    }
  }
}

export { ListCitiesByStatesService };
