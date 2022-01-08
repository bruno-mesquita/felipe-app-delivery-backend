import CityManager from '@core/city-manager';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

export class UpdateCityManagerService {
  async execute(values: any): Promise<ServiceResponse<boolean>> {
    try {
      const cityManager = await CityManager.findOne({ where: { id: values.id } });

      if (!cityManager) throw new ApiError('Usuário não encontrado');

      cityManager.set('name', values.name);
      cityManager.set('email', values.email);
      cityManager.set('cellphone', values.cellphone);
      cityManager.set('city_of_action_id', values.city_of_action_id);

      await cityManager.save();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    };
  };
};
