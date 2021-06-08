import Admin from "@core/admin";
import { Deliveryman } from "@core/deliveryman";
import { ServiceResponse } from "@shared/utils/service-response";

export class DeleteDeliverymanService {
  async execute(adminId: number, deliverymanId: number): Promise<ServiceResponse<boolean>> {
    try {
      const admin = Admin.findOne({ where: { id:  adminId }, attributes: ['id'] });

      if(!admin) throw new Error('usuário não encontrado');

      const deliveryman = await Deliveryman.findOne({ where: { id: deliverymanId }, attributes: ['id'] });

      if(!deliveryman) throw new Error('Motoboy não encontrado');

      await deliveryman.destroy();

      return { err: null, result: true };
    } catch (err) {
      return { err: 'Erro ao deletar', result: false };
    }
  }
}
