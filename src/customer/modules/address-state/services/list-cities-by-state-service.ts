import { getCustomRepository } from 'typeorm';
import AddressState from '@core/address-state';
import { AddressStateRepository } from '../address-state.repository';

class ListCitiesByStatesService {
  async execute(state_id: string): Promise<AddressState | undefined> {
    try {
      const statesRepository = getCustomRepository(AddressStateRepository);

      const states = await statesRepository.findOne({
        where: {
          id: state_id,
        },
        relations: ['cities'],
      });

      return states;
    } catch (err) {
      return undefined;
    }
  }
}

export { ListCitiesByStatesService };
