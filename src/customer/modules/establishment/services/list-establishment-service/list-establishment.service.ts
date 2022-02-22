import AddressClient from '@core/address-client';
import AddressEstablishment from '@core/address-establishment';
import Category from '@core/category';
import Establishment from '@core/establishment';
import EstablishmentCategory from '@core/establishment-category';
import Image from '@core/image';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { createPagination } from '@shared/utils/use-page';

class ListEstablishmentService {
  async execute(
    categoryName: string,
    clientId: number,
    page = 0
  ): Promise<ServiceResponse<any[]>> {
    try {
      const { limit, offset } = createPagination(page);

      const category = await Category.findOne({
        where: { name: categoryName },
      });

      if (!category) throw new ApiError('Categoria não encontrada');

      const addressClient = await AddressClient.findOne({
        where: { client_id: clientId, active: true },
        attributes: ['id', 'city_id'],
      });

      if (!addressClient) throw new ApiError('Endereço não encontrado');

      const establishments = await Establishment.findAll({
        where: { active: true },
        attributes: [
          'id',
          'name',
          'openingTime',
          'closingTime',
          'freightValue',
        ],
        include: [
          {
            model: Image,
            as: 'image',
            attributes: ['encoded'],
          },
          {
            model: AddressEstablishment,
            as: 'address',
            where: { city_id: addressClient.getCityId() },
            attributes: ['city_id'],
          },
          {
            model: EstablishmentCategory,
            as: 'categories',
            attributes: ['category_id'],
            where: { category_id: category.getId() },
          },
        ],
        limit,
        offset,
      });

      return { result: establishments, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

export { ListEstablishmentService };
