import State from '@core/schemas/state.schema';
import ApiError from '@shared/utils/ApiError';
import { UpdateStateDto } from '../dtos/update-state-dto';
import { schema } from '../validations/create-state.validation';

export class UpdateStateService {
  async execute(updateStateDto: UpdateStateDto): Promise<void> {
    try {
      // Fazendo validação DTO
      const valid = schema.isValidSync(updateStateDto);

      if (!valid) throw new ApiError('Dados inválidos');

      // Verificando se o Estado já exite

      const state = await State.findOne({ name: updateStateDto.name, _id: updateStateDto.id });

      if (!state) throw new ApiError('[ERRO]: Estado não existe no sistema!');

      await state.update({ name: updateStateDto.name, active: updateStateDto.active });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
