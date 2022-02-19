
import City from '@core/city';
import ApiError from '@shared/utils/ApiError';
import { NeighborhoodRepository } from '@admin/modules/neighborhood';

import type { CityAddressDto } from '../dtos/create-city-dto';
import { createValidate } from '../validations';

export class CreateCityService {
  private readonly neighborhoodRepository: NeighborhoodRepository;

  constructor() {
    this.neighborhoodRepository = new NeighborhoodRepository();
  }

  async execute(createCityDto: CityAddressDto): Promise<number> {
    try {
      // Fazendo validação DTO
      const { neighborhoods, ...cityDto } = createValidate(createCityDto);

      // Verificando se a Cidade existe no banco de dados
      const cityExists = await City.findOne({ where: { name: cityDto.name } });

      if (cityExists) throw new ApiError('[ERRO]: Cidade já existente no sistema!');

      const city = await City.create(cityDto);

      await this.neighborhoodRepository.createMany(neighborhoods.map(item => ({
        name: item,
        active: true,
        cityId: city.get('id')
      })));

      return city.get('id');
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
