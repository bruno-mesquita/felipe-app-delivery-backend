import City from '@core/city';
import ApiError from '@shared/utils/ApiError';
import type { UpdateCityDto } from '../dtos/update-city-dto';
import { updateValidate } from '../validations';

export class UpdateCityService {
  async execute(updateCityDto: UpdateCityDto): Promise<void> {
    try {
      const values = updateValidate(updateCityDto);

      const { id, ...restDto } = values;

      const city = await City.findOne({ where: { id } });

      if (!city) throw new ApiError('[ERRO]: Cidade não existente no sistema!');

      await city.update(restDto);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
