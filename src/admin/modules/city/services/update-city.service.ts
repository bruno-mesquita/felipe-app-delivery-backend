import City from '@core/schemas/city.schema';
import ApiError from '@shared/utils/ApiError';
import { UpdateCityDto } from '../dtos/update-city-dto';
import { updateValidate } from '../validations';

export class UpdateCityService {
  async execute(updateCityDto: UpdateCityDto): Promise<void> {
    try {
      const values = updateValidate(updateCityDto);

      const { _id, ...restDto } = values;

      // Verificando se a Cidade existe no banco de dados
      const city = await City.findOne({ _id });

      if (!city) throw new ApiError('[ERRO]: Cidade não existente no sistema!');

      await city.update(restDto);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
