import Image from '@core/image';
import Menu from '@core/menu';
import Product from '@core/product';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import type { UpdateProductDto } from '../../dtos/update-product-dto';

export class UpdateProductService {
  async execute(updateProductDto: UpdateProductDto): Promise<ServiceResponse<boolean>> {
    try {
      // Verificando se o produto existe
      const product = await Product.findByPk(updateProductDto.id);

      if (!product) throw new ApiError('Produto não encontrado.');

      // Verificando se o Menu existe

      const menuExists = await Menu.findByPk(updateProductDto.menu, { attributes: ['id'] });

      if (!menuExists) throw new ApiError('Menu não encontrado.');

      // Editando classe e Salvando no DB
      const { name, price, description, image, active, menu } = updateProductDto;

      
      await product.update({
        name,
        price,
        description,
        active,
        menu_id: menu,
      });

      const photo = await Image.findOne({ where: { id: product.get('image_id') }, attributes: ['encoded'] });

      await photo.update({ encoded: image });

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao procurar produto', 'unknown', 500);
    }
  }
}
