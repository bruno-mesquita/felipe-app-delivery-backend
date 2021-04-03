import State from '@core/address-state';
import { AddresStateRepository } from '../repository/state-repository';

class ListStatesService {
  async execute(): Promise<State[]> {
    try {
      const states = await statesRepository.find({ where: { active: true }, select: ['name', 'id'] });

      return states;
    } catch (err) {
      return [];
    }
  }
}

export { ListStatesService };
