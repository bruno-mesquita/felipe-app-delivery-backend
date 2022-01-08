/**
 * @fileoverview Criação de serviço de address de user customer
 */

import State from '@core/state';
import ApiError from '@shared/utils/ApiError';
import { CreateStateADto } from '../dtos/create-state-dto';
import { schema } from '../validations/create-state.validation';

export class CreateStateService {
  async execute(createStateDto: CreateStateADto): Promise<any> {
    try {
      // Fazendo validação DTO
      const valid = schema.isValidSync(createStateDto);

      if (!valid) throw new ApiError('[Erro: Estado] Por favor reveja seus dados');

      // Verificando se o Estado já exite

      const stateExists = await State.findOne({
        where: { name: createStateDto.name },
      });

      if (stateExists) throw new ApiError('[ERRO]: Estado já existe no sistema!');

      // criando classe

      const state = await State.create(createStateDto);

      return { result: state.getId(), err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
