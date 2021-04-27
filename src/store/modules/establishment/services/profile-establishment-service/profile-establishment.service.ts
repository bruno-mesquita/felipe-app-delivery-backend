import { ServiceResponse } from '@shared/utils/service-response';
import Establishment from '@core/establishment';
import Image from '@core/image';

export class ProfileEstablishmentService {
  async execute(id: number, selects: string[]): Promise<ServiceResponse<any>> {
    try {
      const include = [];

      const includeAvatar = selects.find(item => item === 'avatar');

      if(includeAvatar) {
        include.push({
          model: Image,
            as: 'image',
            attributes: ['name', 'encoded'],
        })
        selects = selects.filter(item => item !== 'avatar');
      }

      const client = await Establishment.findOne({
        where: { id, active: true },
        attributes: selects,
        include
      })

      if(!client) throw new Error('Cliente não encontrado');

      const result = {
        ...client.toJSON()
      }

      if(includeAvatar) {
        result['image'] = client?.image?.encoded || null
      }

      return {
        result,
        err: null,
      };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
