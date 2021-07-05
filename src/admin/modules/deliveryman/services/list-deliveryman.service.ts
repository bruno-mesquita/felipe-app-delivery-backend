import { Deliveryman } from "@core/deliveryman";
import { ServiceResponse } from "@shared/utils/service-response";

export class ListDeliverymanService {
  async execute(): Promise<ServiceResponse<Deliveryman[]>> {
    try {
      const data = await Deliveryman.findAll();

      return { err: null, result: data };
    } catch (err) {
      return { err: 'Erro ao listar', result: [] };
    }
  }
}
