import type { IFreightAttributes } from '@core/Freight';
import ApiError from '@shared/utils/ApiError';
import Freight from '@core/Freight';

export class CreateFreightService {
  async execute(values: IFreightAttributes): Promise<number> {
    try {
      console.log(values);
      const freight = await Freight.create(values);

      return freight.id;
    } catch (err) {
      console.log(err);
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
