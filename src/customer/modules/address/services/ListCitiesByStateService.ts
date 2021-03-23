import { getCustomRepository } from 'typeorm';
import State from '@core/address-state';
import { AddresStateRepository } from '../../../../admin/modules/address/repository/StateRepository';

class ListCitiesByStatesServices {
  async execute(state_id: string): Promise<State | undefined> {
    const statesRepository = getCustomRepository(AddresStateRepository);

    const states = await statesRepository.findOne({
      where: {
        id: state_id,
      },
      relations: ['cities'],
    });

    return states;
  }
}

export { ListCitiesByStatesServices };
