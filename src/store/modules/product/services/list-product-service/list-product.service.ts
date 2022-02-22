import Image from '@core/image';
import Menu from '@core/menu';
import Product from '@core/product';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { createPagination } from '@shared/utils/use-page';

export class ListProductsService {
  async execute(
    establishmentId: number,
    page = 0,
    menuId?: number | undefined
  ): Promise<ServiceResponse<Product[] | null>> {
    try {
      const { limit, offset } = createPagination(page);

      const menuWhere: any = { establishment_id: establishmentId };

      if (menuId) menuWhere.id = menuId;

      const products = await Product.findAll({
        attributes: ['id', 'name', 'price', 'menu_id'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded'],
          },
          {
            model: Menu,
            as: 'menu',
            where: menuWhere,
            attributes: ['id'],
          },
        ],
        limit,
        offset,
      });

      return { result: products, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao listar produto', 'unknown', 500);
    }
  }
}
