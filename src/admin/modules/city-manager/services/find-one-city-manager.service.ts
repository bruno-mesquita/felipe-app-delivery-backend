import City from '@core/city';
import CityManager from '@core/city-manager';
import State from '@core/state';
import ApiError from '@shared/utils/ApiError';

export class FindOneCityManagerService {
  async execute(id: string): Promise<any> {
    try {
      const cityManager = CityManager.findOne({
        where: { id },
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
      });

      return cityManager;

      if (!cityManager) throw new ApiError('Usuário não encontrado');

      return cityManager;
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
