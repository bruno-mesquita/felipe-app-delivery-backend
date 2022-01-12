import { Deliveryman } from "@core/deliveryman";
import { ServiceResponse } from "@shared/utils/service-response";
import { createPagination } from "@shared/utils/use-page";

export class ListDeliverymanService {
  async execute(page = 0): Promise<ServiceResponse<Deliveryman[]>> {
    try {
      const { limit, offset } = createPagination(page);

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
