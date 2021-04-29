import Menu from '@core/menu';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';
import { DeleteProductDto } from '../../dtos/delete-product-dto';

export class DeleteProductService {
  async execute({ menu_id, product_id }: DeleteProductDto): Promise<ServiceResponse<boolean>> {
    try {
      // Verificando se o Menu existe
      const menu = await Menu.findByPk(menu_id);

      if (!menu) throw new Error('Menu não encontrado.');

      // Verificando se o produto existe com esse menu
      const product = await Product.findOne({
        where: { id: product_id, menu_id }
      });

      if (!product) throw new Error('Produto não encontrado.');

      await product.destroy();

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}
