/**
 * @fileoverview Voltar os dados do estabelecimento
 */

import { ServiceResponse } from '@shared/utils/service-response';
import Establishment from '@core/establishment';
import Image from '@core/image';
import AddressEstablishment from '@core/address-establishment';
import City from '@core/city';
import { EstablishmentOwner } from '@core/establishment-owner';

export class ProfileEstablishmentService {
  async execute(id: number, selects: string[], ownerId: number): Promise<ServiceResponse<any>> {
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

      const owner = await EstablishmentOwner.findOne({
        where: { id: ownerId, active: true },
        include: [{
          model: Establishment,
          where: { id, active: true },
          attributes: ['id', ...selects],
          include
        }]
      });

      if(!owner) throw new Error('Estabelecimento não encontrado');


      const result = {
        ...owner.establishment.toJSON()
      }

      if(includeAvatar) {
        result['image'] = owner.establishment?.image?.encoded || null
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
