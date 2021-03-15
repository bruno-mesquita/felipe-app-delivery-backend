import { getCustomRepository } from 'typeorm';
import State from '@core/address-state';
import { AddresStateRepository } from '../../repository/StateRepository';

class ListStatesService {
  async execute(state_id: string): Promise<State | undefined> {
    const statesRepository = getCustomRepository(AddresStateRepository);

    const states = await statesRepository.findOne({
      where: {
        id: state_id,
      },
      relations: ['cities'],
    });

    console.log(states);

    return states;
  }
}

export { ListStatesService };
