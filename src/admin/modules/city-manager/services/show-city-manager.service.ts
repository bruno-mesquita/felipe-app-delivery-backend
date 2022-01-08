import { ServiceResponse } from '@shared/utils/service-response';
import CityManager from '@core/city-manager';
import City from '@core/city';
import State from '@core/state';
import ApiError from '@shared/utils/ApiError';

export class ShowCityManagerService {
  async execute(id: number): Promise<ServiceResponse<CityManager>> {
    try {
      const cityManager = await CityManager.findOne({
        where: { id, active: true },
        attributes: ['id', 'active', 'email', 'name', 'cellphone'],
        include: [
          {
            model: City,
            as: 'cityOfAction',
            attributes: ['id'],
            include: [{
              model: State,
              as: 'state',
              attributes: ['id'],
            }]
          },
        ],
      });

      if (!cityManager) throw new ApiError('Usuário não encontrado');

      return { result: cityManager, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    };
  };
};
