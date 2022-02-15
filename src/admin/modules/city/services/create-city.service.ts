import City from '@core/schemas/city.schema';
import State from '@core/schemas/state.schema';
import ApiError from '@shared/utils/ApiError';
import { CityAddressDto } from '../dtos/create-city-dto';
import { createValidate } from '../validations';

export class CreateCityService {
  async execute(createCityDto: CityAddressDto): Promise<string> {
    try {
      // Fazendo validação DTO
      const values = createValidate(createCityDto);

      // Verificando se a Cidade existe no banco de dados
      const cityExists = await City.findOne({ name: values.name }).select(['name']);

      if (cityExists) throw new ApiError('[ERRO]: Cidade já existente no sistema!');

      // Verificando se o Estado existe no sistema ou se está selecionado

      const state = await State.findOne({ _id: values.state }).select(['name']);

      const city = await City.create(values);

      return city._id.toHexString();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
