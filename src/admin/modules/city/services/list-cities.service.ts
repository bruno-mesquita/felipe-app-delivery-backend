import City from '@core/city';
import State from '@core/state';
import ApiError from '@shared/utils/ApiError';

export class ListCitiesService {
  async execute(): Promise<City[]> {
    try {
      return City.findAll({
        attributes: ['id', 'name', 'active'],
        include: [
          {
            model: State,
            as: 'state',
            attributes: ['name'],
          },
        ],
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
