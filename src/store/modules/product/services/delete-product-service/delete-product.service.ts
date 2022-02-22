import Establishment from '@core/establishment';
import Menu from '@core/menu';
import Product from '@core/product';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { DeleteProductDto } from '../../dtos/delete-product-dto';

export class DeleteProductService {
  async execute({
    menuId,
    productId,
    establishmentId,
  }: DeleteProductDto): Promise<ServiceResponse<boolean>> {
    try {
      // Verificando se o produto existe com esse menu
      const product = await Product.findOne({
        where: { id: productId },
        include: [
          {
            model: Menu,
            as: 'menu',
            where: { id: menuId },
            include: [
              {
                model: Establishment,
                as: 'establishments',
                where: { id: establishmentId },
              },
            ],
          },
        ],
      });

      if (!product) throw new ApiError('Produto não encontrado.');

      await product.destroy();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao deletar produto', 'unknown', 500);
    }
  }
}
