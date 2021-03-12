/**
 * @fileoverview Criação de serviço de address City de user customer
 */

import City from '@core/address-city';
import { ServiceResponse } from '@shared/utils/service-response';
import { getCustomRepository } from 'typeorm';
import { CityAddressDto } from '../../dtos/create-city-dto';
import { AddressCityRepository } from '../../repository/CityRepository';
import { AddresStateRepository } from '../../repository/StateRepository';
import { schema } from '../../validations/create-city.validation';

class CreateCityService {
  async execute(createCityDto: CityAddressDto): Promise<ServiceResponse<City | null>> {
    try {
      const cityRepository = getCustomRepository(AddressCityRepository);
      const stateRepository = getCustomRepository(AddresStateRepository);

      // Fazendo validação DTO

      const valid = schema.isValidSync(createCityDto);

      if (!valid) throw new Error('[Erro]: Cidade Por favor reveja seus dados');

      // Verificando se a Cidade existe no banco de dados

      const cityExists = await cityRepository.findByName(createCityDto.name);

      if (cityExists) throw new Error('[ERRO]: Cidade já existente no sistema!');

      // Verificando se o Estado existe no sistema ou se está selecionado

      const stateExists = await stateRepository.findById(createCityDto.state);

      if (!stateExists && !createCityDto.state) throw new Error('[ERRO]: Estado não encontrado/selecionado.');

      // criando classe

      const city = cityRepository.create({
        ...createCityDto,
        state: stateExists,
        active: true,
      });

      // Salvando no Banco de dados

      await cityRepository.save(city);

      return { result: city, err: null };
    } catch (err) {
      return { result: err, err: err.message };
    }
  }
}

export { CreateCityService };
