import Image from '@core/image';
import Menu from '@core/menu';
import Product from '@core/product';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { createPagination } from '@shared/utils/use-page';

import { IFindProductsByMenuDto } from '../dtos';

export class FindProductsByMenuService {
  async execute({ page, id }: IFindProductsByMenuDto): Promise<ServiceResponse<Product[]>> {
    try {
      const { limit, offset } = createPagination(page);

      const menu = await Menu.findOne({ where: { id: id, active: true }, attributes: ['id'] });

      if(!menu) throw new ApiError('Menu não encontrado');

      const products = await Product.findAll({
        where: { menu_id: id, active: true },
        attributes: ['id', 'name', 'price', 'description'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded']
          }
        ],
        limit,
        offset
      });

      return { result: products, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
