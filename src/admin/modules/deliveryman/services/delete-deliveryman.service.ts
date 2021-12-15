import { Deliveryman } from "@core/deliveryman";
import ApiError from "@shared/utils/ApiError";

export class DeleteDeliverymanService {
  async execute(deliverymanId: number): Promise<void> {
    try {
      const deliveryman = await Deliveryman.findOne({ where: { id: deliverymanId }, attributes: ['id'] });

      if(!deliveryman) throw new ApiError('Motoboy não encontrado');

      await deliveryman.destroy();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
