import { Deliveryman } from "@core/deliveryman";
import { ServiceResponse } from "@shared/utils/service-response";

export class DeleteDeliverymanService {
  async execute(deliverymanId: number): Promise<ServiceResponse<boolean>> {
    try {
      const deliveryman = await Deliveryman.findOne({ where: { id: deliverymanId }, attributes: ['id'] });

      if(!deliveryman) throw new Error('Motoboy não encontrado');

      await deliveryman.destroy();

      return { err: null, result: true };
    } catch (err) {
      return { err: 'Erro ao deletar', result: false };
    }
  }
}
