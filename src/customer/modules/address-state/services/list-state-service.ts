import State from '@core/state';
import { ServiceResponse } from '@shared/utils/service-response';

class ListStatesService {
  async execute(): Promise<ServiceResponse<State[]>> {
    try {
      const states = await State.findAll({ where: { active: true }, attributes: ['name', 'id'] });

      return { result: states, err: null };
    } catch (err) {
      return { result: [], err: 'Erro ao buscar os estados' };
    }
  }
}

export { ListStatesService };
