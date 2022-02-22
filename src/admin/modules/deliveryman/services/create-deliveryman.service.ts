import { Deliveryman } from '@core/deliveryman';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

import { ICreateDeliverymanDto } from '../dtos';

export class CreateDeliverymanService {
  async execute(
    model: ICreateDeliverymanDto
  ): Promise<ServiceResponse<number>> {
    try {
      const entity = await Deliveryman.create(model);

      return { result: entity.getId(), err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
