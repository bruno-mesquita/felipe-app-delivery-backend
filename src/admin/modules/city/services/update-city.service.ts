import City from '@core/city';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateCityDto } from '../dtos/update-city-dto';
import { schema } from '../validations/update-city.validation';

export class UpdateCityService {
  async execute(updateCityDto: UpdateCityDto): Promise<ServiceResponse<boolean>> {
    try {
      // Fazendo validação DTO
      const valid = schema.isValidSync(updateCityDto);

      if (!valid) throw new ApiError('[Erro]: Por favor reveja seus dados');

      // Verificando se a Cidade existe no banco de dados
      const city = await City.findOne({
        where: { id: updateCityDto.id },
        attributes: ['id']
      });

      if (!city) throw new ApiError('[ERRO]: Cidade não existente no sistema!');

      city.setName(updateCityDto.name);
      city.setActive(updateCityDto.active);
      city.setStateId(updateCityDto.stateId);

      await city.save();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
