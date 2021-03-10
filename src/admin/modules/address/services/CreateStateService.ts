/**
 * @fileoverview Criação de serviço de address de user customer
 */

import State from '@core/address-state';
import { ServiceResponse } from '@shared/utils/service-response';
import { getCustomRepository } from 'typeorm';
import { StateAddressDto } from '../dtos/create-state-dto';
import { AddresStateRepository } from '../repository/StateRepository';
import { schema } from '../validations/create-state.validation';

class CreateStateService {
  async execute(createStateDto: StateAddressDto): Promise<ServiceResponse<State | null>> {
    try {
      const stateRepository = getCustomRepository(AddresStateRepository);

      // Fazendo validação DTO

      const valid = schema.isValidSync(createStateDto);

      if (!valid) throw new Error('[Erro: Estado] Por favor reveja seus dados');

      // criando classe

      const state = stateRepository.create(createStateDto);

      // Salvando no Banco de dados

      await stateRepository.save(state);

      return { result: state, err: null };
    } catch (err) {
      return { result: err, err: err.message };
    }
  }
}

export { CreateStateService };
