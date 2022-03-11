import Image from '@core/image';
import Product from '@core/product';
import ApiError from '@shared/utils/ApiError';

import type { IFindOneOptions } from './dtos';

class ProductRepository {
  async findOne({ menuId, productId, appVersion }: IFindOneOptions): Promise<Product> {
    try {
      const include: any[] = [];

      if (appVersion <= 1.1) {
        include.push({
          model: Image,
          as: 'image',
          attributes: ['encoded'],
        });
      }

      const product = await Product.findOne({
        where: { id: productId, menu_id: menuId, active: true },
        attributes: ['id', 'name', 'price', 'description', 'unit', 'unitType', 'image_id'],
        include,
      });

      if (!product) throw new ApiError('Produto não encontrado');

      return product;
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao procurar produto');
    }
  }
}

export default ProductRepository;
