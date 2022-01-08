import CityManager from '@core/city-manager';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

export class DeleteCityManagerService {
  async execute(id: number): Promise<ServiceResponse<boolean>> {
    try {
      const cityManager = await CityManager.findOne({
        where: { id },
        attributes: ['id'],
      });

      if (!cityManager) throw new ApiError('Usuário não encontrado');

      await cityManager.destroy();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    };
  };
};
