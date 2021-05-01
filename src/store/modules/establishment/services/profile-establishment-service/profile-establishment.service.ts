/**
 * @fileoverview Voltar os dados do estabelecimento
 */

import { ServiceResponse } from '@shared/utils/service-response';
import Establishment from '@core/establishment';
import Image from '@core/image';
import AddressEstablishment from '@core/address-establishment';
import City from '@core/city';

export class ProfileEstablishmentService {
  async execute(id: number, selects: string[]): Promise<ServiceResponse<any>> {
    try {
      const fieldsBlocks = ['password']

      selects = selects.filter(field => !(!!fieldsBlocks.find(block => block === field)))

      const include = [];

      const includeAvatar = selects.find(item => item === 'image');
      const includeAddress = selects.find(item => item === 'address');

      if(includeAvatar) {
        include.push({
          model: Image,
            as: 'image',
            attributes: ['encoded'],
        })
        selects = selects.filter(item => item !== 'image');
      }

      if(includeAddress) {
        include.push({
            model: AddressEstablishment,
            as: 'address',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
                model: City,
                as: 'city',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
              }
            ],
        })
        selects = selects.filter(item => item !== 'address');
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
