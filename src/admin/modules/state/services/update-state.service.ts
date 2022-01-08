/**
 * @fileoverview Criação de serviço de address de user customer
 */

import State from '@core/state';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateStateDto } from '../dtos/update-state-dto';
import { schema } from '../validations/create-state.validation';

export class UpdateStateService {
  async execute(updateStateDto: UpdateStateDto): Promise<ServiceResponse<boolean>> {
    try {
      // Fazendo validação DTO
      const valid = schema.isValidSync(updateStateDto);

      if (!valid) throw new ApiError('Dados inválidos');

      // Verificando se o Estado já exite

      const state = await State.findOne({
        where: { name: updateStateDto.name },
      });

      if (!state) throw new ApiError('[ERRO]: Estado não existe no sistema!');

      state.setActive(updateStateDto.active);
      state.setName(updateStateDto.name);

      await state.save();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}