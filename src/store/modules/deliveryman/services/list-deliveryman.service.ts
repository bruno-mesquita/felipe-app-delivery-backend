import Admin from "@core/admin";
import { Deliveryman } from "@core/deliveryman";
import { ServiceResponse } from "@shared/utils/service-response";

export class ListDeliverymanService {
  static LIMIT = 15

  async execute(adminId: number, page = 0): Promise<ServiceResponse<Deliveryman[]>> {
    try {
      const limit = ListDeliverymanService.LIMIT;
      const offset = ListDeliverymanService.LIMIT * page;

      const admin = Admin.findOne({ where: { id:  adminId }, attributes: ['id'] });

      if(!admin) throw new Error('usuário não encontrado');

      const data = await Deliveryman.findAll({
        limit,
        offset,
      });

      return { err: null, result: data };
    } catch (err) {
      return { err: 'Erro ao criar', result: [] };
    }
  }
}
