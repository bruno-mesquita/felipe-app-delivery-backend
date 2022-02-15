import State, { IState } from '@core/schemas/state.schema';
import ApiError from '@shared/utils/ApiError';

export class ListStatesService {
  async execute(): Promise<IState[]> {
    try {
      const states = await State.find().select(['name', 'active']);

      return states;
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
