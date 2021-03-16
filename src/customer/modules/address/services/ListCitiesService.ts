import { getCustomRepository } from 'typeorm';
import City from '@core/address-city';
import { AddressCityRepository } from '../../../../admin/modules/address/repository/CityRepository';

class ListCitiesService {
  async execute(): Promise<City[]> {
    const citiesRepository = getCustomRepository(AddressCityRepository);

    const cities = await citiesRepository.find();

    return cities;
  }
}

export { ListCitiesService };
