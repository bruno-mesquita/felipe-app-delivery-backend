import Image from '@core/image';
import Product from '@core/product';
import ApiError from '@shared/utils/ApiError';

import type { IFindOneOptions } from './dtos';

class ProductRepository {
  async findOne({ menuId, productId }: IFindOneOptions): Promise<Product> {
    try {
      const product = await Product.findOne({
        where: { id: productId, menu_id: menuId, active: true },
        attributes: ['id', 'name', 'price', 'description', 'unit', 'unitType'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['id', 'encoded'],
          },
        ],
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
