import { Op } from 'sequelize';

import Evaluation from '@core/evaluation';
import Order from '@core/order';
import { ServiceResponse } from '@shared/utils/service-response';
import { ListRateDto } from '../../dtos';

export class ListRateService {
  static LIMIT = 15;

  public async execute({ page, establishmentId }: ListRateDto): Promise<ServiceResponse<Order[]>> {
    try {
      const limit = ListRateService.LIMIT;
      const offset = ListRateService.LIMIT * page || 0;

      const orders = await Order.findAll({
        where: {
          establishment_id: establishmentId,
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
        order: [['createdAt', 'desc']],
        limit,
        offset,
      });

      return { result: orders, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
