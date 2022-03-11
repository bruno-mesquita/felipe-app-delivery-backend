import Image from '@core/image';
import Menu from '@core/menu';
import Product from '@core/product';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { createPagination } from '@shared/utils/use-page';

import { IFindProductsByMenuDto } from '../dtos';

export class FindProductsByMenuService {
  async execute({ page, id, appVersion }: IFindProductsByMenuDto): Promise<ServiceResponse<Product[]>> {
    try {
      const { limit, offset } = createPagination(page);

      const menu = await Menu.findOne({
        where: { id, active: true },
        attributes: ['id'],
      });

      if (!menu) throw new ApiError('Menu não encontrado');

      const include: any[] = [];
      if (appVersion <= 1.1) {
        include.push({
          model: Image,
          as: 'image',
          attributes: ['encoded'],
        });
      }

      const products = await Product.findAll({
        where: { menu_id: id, active: true },
        attributes: ['id', 'name', 'price', 'image_id'],
        include,
        limit,
        offset,
      });

      return { result: products, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
