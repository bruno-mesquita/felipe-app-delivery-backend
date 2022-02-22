import City from '@core/city';
import State from '@core/state';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListCitiesByStateService {
  async execute(stateId: string): Promise<ServiceResponse<any[]>> {
    try {
      const stateExists = await State.findByPk(stateId, { attributes: ['id'] });

      if (!stateExists) throw new ApiError('Estado não encontrado');

      const result = await City.findAll({
        where: {
          state_id: stateId,
        },
        attributes: ['id', 'name'],
      });

      return { result, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
