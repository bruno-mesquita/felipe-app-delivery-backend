import Image from '@core/image';
import Product from '@core/product';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

import { ShowProductDto } from '../../dtos/show-product-dto';

export class ShowProductService {
  async execute({ id }: ShowProductDto): Promise<ServiceResponse<Product | null>> {
    try {
      const product = await Product.findOne({
        where: { id },
        attributes: ['id', 'name', 'price', 'description', 'menu_id', 'active', 'unit', 'unitType'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded']
          },
        ]
      });

      if (!product) throw new ApiError('Procuro não encontrado');

      return { result: product, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao procurar produto', 'unknown', 500);
    }
  }
}
