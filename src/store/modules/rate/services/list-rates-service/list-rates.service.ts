import Establishment from '@core/establishment';
import Evaluation from '@core/evaluation';
import Order from '@core/order';
import { ServiceResponse } from '@shared/utils/service-response';
import { ListRateDto } from '../../dtos';

export class ListRateService {
  public async execute({ page, id }: ListRateDto): Promise<ServiceResponse<Order[]>> {
    try {
      const establishment = await Establishment.findOne({ where: { id } });

      if(!establishment) throw new Error('Estabelecimento não encontrado');

      const orders = await establishment.getOrders({
        where: { client_order_status: 'Finalizado' }
      })

      return { result: orders, err: null }
    } catch (err) {
      return { result: [], err: err.message };
    }
  }
}
