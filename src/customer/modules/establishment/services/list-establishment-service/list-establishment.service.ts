/**
 * @fileoverview serviço de listagem dos estabelecimentos
 */

import AddressClient from '@core/address-client';
import { AddressEstablishment } from '@core/address-establishment';
import Category from '@core/category';
import City from '@core/city';
import Establishment from '@core/establishment';
import EstablishmentCategory from '@core/establishment-category';
import Image from '@core/image';
import { ServiceResponse } from '@shared/utils/service-response';

class ListEstablishmentService {
  async execute(categoryId: string, addressId: string): Promise<ServiceResponse<any[]>> {
    try {
      const category = await Category.findByPk(categoryId);

      if(!category) throw new Error('Categoria não encontrada');

      const addressClient = await AddressClient.findOne({
        where: { id: addressId },
        attributes: ['id', 'city_id'],
      });

      if(!addressClient) throw new Error('Endereço não encontrado');

      const establishments = await EstablishmentCategory.findAll({
        where: { category_id: categoryId },
        attributes: ['id'],
        include: [
          {
            model: Establishment,
            attributes: ['name', 'freightValue', 'openingTime', 'closingTime'],
            include: [
              {
                model: AddressEstablishment,
                where: { city_id: addressClient.city_id }
              },
              {
                model: Image,
                attributes: ['encoded']
              }
            ]
          }
        ]
      })

      return { result: establishments, err: null };
    } catch (err) {
      return { result: [], err: err.null };
    }
  }
}

export { ListEstablishmentService };
