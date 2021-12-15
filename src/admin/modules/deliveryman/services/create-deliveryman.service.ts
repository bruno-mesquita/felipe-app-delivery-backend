import { Deliveryman } from "@core/deliveryman";
import ApiError from "@shared/utils/ApiError";

import { ICreateDeliverymanDto } from '../dtos';

export class CreateDeliverymanService {
  async execute(model: ICreateDeliverymanDto): Promise<void> {
    try {
      await Deliveryman.create(model);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
