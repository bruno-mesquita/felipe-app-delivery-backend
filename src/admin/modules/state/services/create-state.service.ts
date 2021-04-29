/**
 * @fileoverview Criação de serviço de address de user customer
 */

import State from '@core/state';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateStateADto } from '../dtos/create-state-dto';
import { schema } from '../validations/create-state.validation';

class CreateStateService {
  async execute(createStateDto: CreateStateADto): Promise<ServiceResponse<number>> {
    try {
      // Fazendo validação DTO

      const valid = schema.isValidSync(createStateDto);

      if (!valid) throw new Error('[Erro: Estado] Por favor reveja seus dados');

      // Verificando se o Estado já exite

      const stateExists = await State.findOne({
        where: { name: createStateDto.name },
      });

      if (stateExists) throw new Error('[ERRO]: Estado já existe no sistema!');

      // criando classe

      const state = await State.create({
        ...createStateDto,
      });

      return { result: state.id, err: null };
    } catch (err) {
      return { result: 0, err: err.message };
    }
  }
}

export { CreateStateService };