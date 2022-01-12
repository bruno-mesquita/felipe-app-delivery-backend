import { ServiceResponse } from '@shared/utils/service-response';
import CityManager from '@core/city-manager';
import City from '@core/city';
import State from '@core/state';
import { createPagination } from '@shared/utils/use-page';

export class ListCityManaganersService {
  async execute(page: number): Promise<ServiceResponse<CityManager[]>> {
    const { limit, offset } = createPagination(page);

    try {
      const cityManagers = await CityManager.findAll({
        attributes: ['id', 'name', 'email', 'cellphone', 'active'],
        include: [
          {
            model: City,
            as: 'cityOfAction',
            attributes: ['name'],
            include: [{
              model: State,
              as: 'state',
              attributes: ['name'],
            }]
          },
        ],
        limit,
        offset
      });

      return { result: cityManagers, err: null };
    } catch (err) {
      return { result: [], err: err.message };
    };
  };
};
