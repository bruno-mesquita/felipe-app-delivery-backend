import State from '@core/state';
import { ServiceResponse } from '@shared/utils/service-response';

class ListStatesService {
  async execute(): Promise<ServiceResponse<State[] | null>> {
    try {
      const states = await State.findAll({
        attributes: ['id', 'name', 'active']
      });

      return { result: states, err: null };
    } catch (err) {
      return { result: null, err: err.message};
    }
  }
}

export { ListStatesService };
