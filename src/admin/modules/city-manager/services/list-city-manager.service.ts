import CityManager from '@core/city-manager';
import { createPagination } from '@shared/utils/use-page';
import ApiError from '@shared/utils/ApiError';
import City from '@core/city';
import State from '@core/state';

export class ListCityManaganersService {
  async execute(page: number): Promise<any[]> {
    try {
      const { limit, offset } = createPagination(page);

      return CityManager.findAll({
        include: [
          {
            model: City,
            as: 'cityOfAction',
            attributes: ['name', 'state'],
            include: [
              {
                model: State,
                as: 'state',
                attributes: ['name'],
              },
            ],
          },
        ],
        limit,
        offset,
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
