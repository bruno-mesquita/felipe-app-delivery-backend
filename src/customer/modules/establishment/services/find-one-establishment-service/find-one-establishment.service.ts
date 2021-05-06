import Establishment from '@core/establishment';
import Image from '@core/image';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';

export class FindOneEstablishmentService {
  async execute(id: string): Promise<ServiceResponse<any>> {
    try {
      const establishment = await Establishment.findOne({
        where: { id, active: true },
        attributes: ['id', 'name', 'freightValue'],
        include: [
          {
            model: Menu,
            as: 'menus',
            attributes: ['id', 'name'],
          },
          {
            model: Image,
            as: 'image',
            attributes: ['encoded'],
          }
        ]
      })

      return { result: establishment, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
