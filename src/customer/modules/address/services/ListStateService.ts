import { getCustomRepository } from 'typeorm';
import State from '@core/address-state';
import { AddresStateRepository } from '../../../../admin/modules/address/repository/StateRepository';

class ListStatesService {
  async execute(): Promise<State[]> {
    const statesRepository = getCustomRepository(AddresStateRepository);

    const states = await statesRepository.find();

    return states;
  }
}

export { ListStatesService };
