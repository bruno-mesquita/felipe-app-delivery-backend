import { getCustomRepository } from 'typeorm';
import State from '@core/address-state';
import { AddressStateRepository } from '../address-state.repository';

class ListStatesService {
  async execute(): Promise<State[]> {
    try {
      const statesRepository = getCustomRepository(AddressStateRepository);

      const states = await statesRepository.find({ where: { active: true }, select: ['name', 'id'] });

      return states;
    } catch (err) {
      return [];
    }
  }
}

export { ListStatesService };
