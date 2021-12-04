import Image from '@core/image';
import Menu from '@core/menu';
import Product from '@core/product';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

import { ShowProductDto } from '../../dtos/show-product-dto';

export class ShowProductService {
  async execute({ establishmentId, id }: ShowProductDto): Promise<ServiceResponse<Product | null>> {
    try {
      const product = await Product.findOne({
        where: { id },
        attributes: ['id', 'name', 'price', 'description', 'menu_id', 'active'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded']
          },
          {
            model: Menu,
            as: 'menu',
            where: { establishment_id: establishmentId },
          }
        ]
      });

      if(product) throw new ApiError('Procuro não encontrado');

      return { result: product, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao procurar produto', 'unknown', 500);
    }
  }
}
