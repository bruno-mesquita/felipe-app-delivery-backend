import { getCustomRepository } from 'typeorm';

import { AddressStateRepository } from '../address-state.repository';

class ListCitiesByStatesService {
  async execute(state_id: string): Promise<any[] | undefined> {
    try {
      const statesRepository = getCustomRepository(AddressStateRepository);

      const states = await statesRepository.findOne({
        where: {
          id: state_id,
        },

        relations: ['cities'],
      });

      return states?.cities.map((city) => ({ id: city.getId(), name: city.name }));
    } catch (err) {
      return [];
    }
  }
}

export { ListCitiesByStatesService };
