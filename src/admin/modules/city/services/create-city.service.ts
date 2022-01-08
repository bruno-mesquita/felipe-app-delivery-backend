import City from '@core/city';
import State from '@core/state';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { CityAddressDto } from '../dtos/create-city-dto';
import { schema } from '../validations/create-city.validation';

export class CreateCityService {
  async execute(createCityDto: CityAddressDto): Promise<ServiceResponse<number>> {
    try {
      // Fazendo validação DTO
      const valid = schema.isValidSync(createCityDto);

      if (!valid) throw new ApiError('[Erro]: Por favor reveja seus dados');

      // Verificando se a Cidade existe no banco de dados
      const cityExists = await City.findOne({
        where: { name: createCityDto.name }, attributes: ['id', 'name'],
      });

      if (cityExists) throw new ApiError('[ERRO]: Cidade já existente no sistema!');

      // Verificando se o Estado existe no sistema ou se está selecionado

      const stateExists = await State.findOne({
        where: { id: createCityDto.state }, attributes: ['name', 'id'],
      });

      if (!stateExists && !createCityDto.state) throw new ApiError('[ERRO]: Estado não encontrado/selecionado.');

      // criando classe
      const city = await City.create({
        name: createCityDto.name,
        state_id: stateExists.getId(),
        active: true,
      });

      return { result: city.getId(), err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
