import City from '@core/city';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListCitiesByStatesService {
  async execute(stateId: number): Promise<ServiceResponse<any[] | null>> {
    try {
      const citiesByState = await City.findAll({
        where: { state_id: stateId, active: true },
        attributes: ['id', 'name'],
      });

      return { result: citiesByState, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
