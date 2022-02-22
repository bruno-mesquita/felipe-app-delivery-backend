import CityManager from '@core/city-manager';
import ApiError from '@shared/utils/ApiError';

export class DeleteCityManagerService {
  async execute(id: string): Promise<void> {
    try {
      const user = await CityManager.findOne({ where: { id, active: true } });

      if (!user) throw new ApiError('Usuário não encontrado');

      await user.destroy();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
