import { Deliveryman } from '@core/deliveryman';
import ApiError from '@shared/utils/ApiError';

import type { IUpdateDeliverymanDto } from '../dtos';

export class UpdateDeliverymanService {
  async execute(model: IUpdateDeliverymanDto): Promise<void> {
    try {
      const deliveryman = await Deliveryman.findOne({
        where: { id: model.id },
      });

      if (!deliveryman) throw new ApiError('Motoboy não encontrado');

      await deliveryman.update(model);

      await deliveryman.save();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
