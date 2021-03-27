import { ServiceResponse } from '@shared/utils/service-response';
import { getCustomRepository } from 'typeorm';

import { AddresStateRepository } from '../repository/state-repository';

class ListCitiesByStatesService {
  async execute(state_id: string): Promise<ServiceResponse<any[]>> {
    try {
      const statesRepository = getCustomRepository(AddresStateRepository);

      const states = await statesRepository.findOne({
        where: {
          id: state_id,
        },
        relations: ['cities'],
      });

      const result = states?.cities.map((city) => ({ id: city.getId(), name: city.name }));

      return { result, err: null };
    } catch (err) {
      return { result: [], err: err.message };
    }
  }
}

export { ListCitiesByStatesService };
