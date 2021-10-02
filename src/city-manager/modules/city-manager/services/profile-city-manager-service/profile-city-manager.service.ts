import { ServiceResponse } from '@shared/utils/service-response';
import CityManager from '@core/city-manager';
import Image from '@core/image';

export class ProfileCityManagerService {
  async execute(id: number, selects: string[]): Promise<ServiceResponse<any>> {
    try {
      const include = [];

      const includeAvatar = selects.find(item => item === 'avatar');

      if(includeAvatar) {
        include.push({
          model: Image,
            as: 'avatar',
            attributes: ['name', 'encoded'],
        })
        selects = selects.filter(item => item !== 'avatar');
      }

      const client = await CityManager.findOne({
        where: { id, active: true },
        attributes: selects,
        include
      })

      if(!client) throw new Error('Cliente não encontrado');

      const result = {
        ...client.toJSON()
      }

      if(includeAvatar) {
        result['avatar'] = client?.avatar?.encoded || null
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
