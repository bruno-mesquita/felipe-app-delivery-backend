import { Op } from 'sequelize';

import AddressClient from '@core/address-client';
import Establishment from '@core/establishment';
import { ServiceResponse } from '@shared/utils/service-response';
import Image from '@core/image';
import AddressEstablishment from '@core/address-establishment';

export class SearchEstablishmentsByName {
  async execute(searchName: string, clientId: number): Promise<ServiceResponse<any[]>> {
    try {
      const addressClient = await AddressClient.findOne({
        where: { client_id: clientId, active: true },
        attributes: ['id', 'city_id'],
      });

      const establishments = (await Establishment.findAll({
        where: { name: { [Op.iLike]: `%${searchName}%` } },
        attributes: ['id', 'name' ,'openingTime', 'closingTime', 'freightValue'],
        include: [
          {
            model: Image,
            as: 'image',
            attributes: ['encoded'],
          },
          {
            model: AddressEstablishment,
            as: 'address',
            where: { city_id: addressClient.city_id },
            attributes: { exclude: ['createdAt', 'updatedAt', 'city_id'] }
          },
        ],
      }))

      return { result: establishments, err: null };
    } catch (err) {
      return { result: [], err: err.message };
    }
  }
}
