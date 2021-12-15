import CityManager from '@core/city-manager';
import { ServiceResponse } from '@utils/service-response';

export class DeleteCityManagerService {
  async execute(id: number): Promise<ServiceResponse<boolean>> {
    try {
      const cityManager = await CityManager.findOne({
        where: { id },
        attributes: ['id'],
      });

      if (!cityManager) throw new Error('Usuário não encontrado');

      await cityManager.destroy();

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    };
  };
};
