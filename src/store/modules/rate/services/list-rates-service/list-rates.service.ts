import { Op } from 'sequelize';

import Establishment from '@core/establishment';
import Evaluation from '@core/evaluation';
import Order from '@core/order';
import { ServiceResponse } from '@shared/utils/service-response';
import { ListRateDto } from '../../dtos';

export class ListRateService {
  static LIMIT = 15;

  public async execute({ page, id }: ListRateDto): Promise<ServiceResponse<Order[]>> {
    try {
      const limit = ListRateService.LIMIT;
      const offset = ListRateService.LIMIT * page || 0;

      const establishment = await Establishment.findByPk(id);

      if (!establishment) throw new Error('Estabelecimento não encontrado');

      const orders = await establishment.getOrders({
        where: {
          order_status: 'Finalizado',
          evaluation_id: { [Op.ne]: null },
        },
        attributes: ['total', 'createdAt'],
        include: [
          {
            model: Evaluation,
            as: 'evaluation',
            attributes: ['value', 'message'],
          }
        ],
        limit,
        offset,
      });

      return { result: orders, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
