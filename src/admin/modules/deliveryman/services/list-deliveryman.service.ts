import Admin from "@core/admin";
import { Deliveryman } from "@core/deliveryman";
import { ServiceResponse } from "@shared/utils/service-response";

export class ListDeliverymanService {
  async execute(adminId: number): Promise<ServiceResponse<Deliveryman[]>> {
    try {
      const admin = Admin.findOne({ where: { id:  adminId }, attributes: ['id'] });

      if(!admin) throw new Error('usuário não encontrado');

      const data = await Deliveryman.findAll();

      return { err: null, result: data };
    } catch (err) {
      return { err: 'Erro ao listar', result: [] };
    }
  }
}
