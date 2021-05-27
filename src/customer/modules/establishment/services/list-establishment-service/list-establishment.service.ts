/**
 * @fileoverview serviço de listagem dos estabelecimentos
 */

import AddressClient from '@core/address-client';
import AddressEstablishment from '@core/address-establishment';
import Category from '@core/category';
import Establishment from '@core/establishment';
import EstablishmentCategory from '@core/establishment-category';
import Image from '@core/image';
import { ServiceResponse } from '@shared/utils/service-response';

class ListEstablishmentService {
  static LIMIT = 15

  async execute(categoryName: string, clientId: number, page = 0): Promise<ServiceResponse<any[]>> {
    try {
      const limit = ListEstablishmentService.LIMIT;
      const offset = ListEstablishmentService.LIMIT * page;

      const category = await Category.findOne({ where: { name: categoryName } });

      if(!category) throw new Error('Categoria não encontrada');

      const addressClient = await AddressClient.findOne({
        where: { client_id: clientId, active: true },
        attributes: ['id', 'city_id'],
      });

      if(!addressClient) throw new Error('Endereço não encontrado');

      const establishments = await Establishment.findAll({
        where: { active: true },
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
            attributes: ['city_id'],
          },
          {
            model: EstablishmentCategory,
            as:  'establishments',
            attributes: ['category_id'],
            where: { category_id: category.id }
          }
        ],
        limit,
        offset,
      })


      return { result: establishments, err: null };
    } catch (err) {

      return { result: [], err: err.null };
    }
  }
}

export { ListEstablishmentService };
