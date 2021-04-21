import Menu from '@core/menu';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';
import { DeleteProductDto } from '../../dtos/delete-product-dto';

export class DeleteProductService {
  async execute({ id, menuId }: DeleteProductDto): Promise<ServiceResponse<boolean>> {
    try {
      // Verificando se o produto existe
      const product = await Product.findByPk(id);

      if (!product) throw new Error('Produto não encontrado.');

      // Verificando se o Menu existe
      const menu = await Menu.findByPk(menuId);

      if (!menu) throw new Error('Menu não encontrado.');

      await product.destroy();

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}
