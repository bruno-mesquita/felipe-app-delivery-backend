import City from '@core/city';
import { ServiceResponse } from '@shared/utils/service-response';

class ListCitiesByStatesService {
  async execute(state_id: number): Promise<ServiceResponse<City[] | null>> {
    try {
      const citiesByState = await City.findAll({
        where: { state_id },
        attributes: ['id', 'name', 'active'],
      });

      return { result: citiesByState, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { ListCitiesByStatesService };
