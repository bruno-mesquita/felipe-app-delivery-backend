import State from '@core/schemas/state.schema';
import ApiError from '@shared/utils/ApiError';
import { CreateStateADto } from '../dtos/create-state-dto';
import { schema } from '../validations/create-state.validation';

export class CreateStateService {
  async execute(createStateDto: CreateStateADto): Promise<string> {
    try {
      // Fazendo validação DTO
      const valid = schema.isValidSync(createStateDto);

      if (!valid) throw new ApiError('[Erro: Estado] Por favor reveja seus dados');

      // Verificando se o Estado já exite

      const stateExists = await State.findOne({ name: createStateDto.name });

      if (stateExists) throw new ApiError('[ERRO]: Estado já existe no sistema!');

      // criando classe
      const state = await State.create(createStateDto);

      return state._id.toHexString();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
