import CityManager from '@core/city-manager';
import ApiError from '@shared/utils/ApiError';

export class UpdateCityManagerService {
  async execute(values: any): Promise<void> {
    try {
      const user = await CityManager.findByPk(values.id);

      if (!user) throw new ApiError('Usuário não encontrado');

      await user.update(values);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
