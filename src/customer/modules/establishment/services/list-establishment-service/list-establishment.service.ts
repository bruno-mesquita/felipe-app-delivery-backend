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

      const establishments = (await Establishment.findAll({
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
            attributes: { exclude: ['createdAt', 'updatedAt', 'city_id'] }
          },
          {
            model: Category,
            attributes: ['id'],
            through: {
              as: 'establishment_category',
              attributes: ['category_id'],
              where: { category_id: categoryId }
            }
          }
        ],
        order: [['evaluation', 'asc']]
      })).map(item => ({
        id: item.id,
        name: item.name,
        image: item.image.encoded,
        address: item.address,
        openingTime: item.openingTime,
        closingTime: item.closingTime,
        freightValue: item.freightValue,
        evaluation: item.evaluation,
        isOpen: item.isOpen(),
      }))


      return { result: establishments, err: null };
    } catch (err) {

      return { result: [], err: err.null };
    }
  }
}

export { ListEstablishmentService };
