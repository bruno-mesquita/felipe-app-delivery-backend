import Neighborhood from '@core/neighborhood';
import City from '@core/city';
import ApiError from '@shared/utils/ApiError';

export class FindOneCityService {
  async execute(cityId: number): Promise<any> {
    try {
      const city = await City.findOne({ where: { id: cityId }, attributes: ['name', 'active'], raw: true });

      const neighborhoods = await Neighborhood.findAll({ where: { city: cityId } });

      return {
        id: city.id,
        name: city.name,
        active: city.active,
        neighborhoods
      }
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

