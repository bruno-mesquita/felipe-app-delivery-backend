import State from '@core/state';
import ApiError from '@shared/utils/ApiError';

export class ListStatesService {
  async execute(): Promise<State[]> {
    try {
      const states = await State.findAll({
        attributes: ['id', 'name', 'active'],
      });

      return states;
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
