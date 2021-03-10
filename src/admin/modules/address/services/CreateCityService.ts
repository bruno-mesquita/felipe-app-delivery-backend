/**
 * @fileoverview Criação de serviço de address City de user customer
 */

import City from '@core/address-city';
import { ServiceResponse } from '@shared/utils/service-response';
import { getCustomRepository } from 'typeorm';
import { CityAddressDto } from '../dtos/create-city-dto';
import { AddressCityRepository } from '../repository/CityRepository';
import { schema } from '../validations/create-city.validation';

class CreateCityService {
  async execute(createStateDto: CityAddressDto): Promise<ServiceResponse<City | null>> {
    try {
      const cityRepository = getCustomRepository(AddressCityRepository);

      // Fazendo validação DTO

      const valid = schema.isValidSync(createStateDto);

      if (!valid) throw new Error('[Erro: Cidade] Por favor reveja seus dados');

      // criando classe

      const city = cityRepository.create(createStateDto);

      // Salvando no Banco de dados

      await cityRepository.save(city);

      return { result: city, err: null };
    } catch (err) {
      return { result: err, err: err.message };
    }
  }
}

export { CreateCityService };
