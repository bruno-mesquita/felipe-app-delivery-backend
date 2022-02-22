import { Deliveryman } from '@core/deliveryman';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

import { IUpdateDeliverymanDto } from '../dtos';

export class UpdateDeliverymanService {
  async execute(model: IUpdateDeliverymanDto): Promise<void> {
    try {
      const deliveryman = await Deliveryman.findOne({
        where: { id: model.id },
      });

      if (!deliveryman) throw new ApiError('Motoboy não encontrado');

      deliveryman.setName(model.name);
      deliveryman.setCellphone(model.cellphone);
      deliveryman.setEntryDate(model.entry_date);
      deliveryman.setDepartureDate(model.departure_date);
      deliveryman.setDepartureDate(model.departure_date);
      deliveryman.setCityId(model.city_id);

      await deliveryman.save();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
