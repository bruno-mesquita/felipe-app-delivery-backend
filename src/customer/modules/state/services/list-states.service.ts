import State from '@core/state';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListStatesService {
  async execute(): Promise<ServiceResponse<State[]>> {
    try {
      const states = await State.findAll({ where: { active: true }, attributes: ['name', 'id'] });

      return { result: states, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
