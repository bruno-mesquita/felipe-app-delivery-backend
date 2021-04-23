/**
 * @fileoverview Criação de serviço de address City de user customer
 */


import City from '@core/city';
import State from '@core/state';
import { ServiceResponse } from '@shared/utils/service-response';
import { CityAddressDto } from '../dtos/create-city-dto';
import { schema } from '../validations/create-city.validation';

export class CreateCityService {
  async execute(createCityDto: CityAddressDto): Promise<ServiceResponse<boolean>> {
    try {
      // Fazendo validação DTO
      const valid = schema.isValidSync(createCityDto);

      if (!valid) throw new Error('[Erro]: Por favor reveja seus dados');

      // Verificando se a Cidade existe no banco de dados
      const cityExists = await City.findOne({
        where: { name: createCityDto.name }
      });

      if (cityExists) throw new Error('[ERRO]: Cidade já existente no sistema!');

      // Verificando se o Estado existe no sistema ou se está selecionado

      const stateExists = await State.findOne({
        where: { id: createCityDto.state }, attributes: ['name', 'id'],
      });

      if (!stateExists && !createCityDto.state) throw new Error('[ERRO]: Estado não encontrado/selecionado.');

      // criando classe
      await City.create({
        name: createCityDto.name,
        state_id: stateExists.id,
        active: true,
      });

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}
