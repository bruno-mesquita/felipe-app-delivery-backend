import { Op } from 'sequelize';

import Image from '@core/image';
import Menu from '@core/menu';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';
import ApiError from '@shared/utils/ApiError';

import { SearchNameProductDto } from '../../dtos/search-name-product-dto';

export class SearchNameProductsService {
  async execute({
    establishmentId,
    search,
  }: SearchNameProductDto): Promise<ServiceResponse<Product[] | null>> {
    try {
      const products = await Product.findAll({
        where: { name: { [Op.iLike]: `%${search}%` } },
        attributes: ['id', 'name', 'price'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded'],
          },
          {
            model: Menu,
            as: 'menu',
            where: { establishment_id: establishmentId },
            attributes: ['id'],
          },
        ],
      });

      return { result: products, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao procurar produto', 'unknown', 500);
    }
  }
}
