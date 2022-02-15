import Image from '@core/image';
import Menu from '@core/menu';
import Product from '@core/product';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import type { UpdateProductDto } from '../../dtos/update-product-dto';

export class UpdateProductService {
  async execute({ id, _id, menu, image, ...modelDto }: UpdateProductDto): Promise<ServiceResponse<boolean>> {
    try {
      const productId = id || _id;

      // Verificando se o produto existe
      const product = await Product.findByPk(productId);

      if (!product) throw new ApiError('Produto não encontrado.');

      if(menu) {
        const menuExists = await Menu.findByPk(menu, { attributes: ['id'] });

        if (!menuExists) throw new ApiError('Menu não encontrado.');

        modelDto.menu_id = menu;
      }

      if(image) {
        const photo = await Image.findOne({ where: { id: product.get('image_id') }, attributes: ['encoded'] });

        await photo.update({ encoded: image });
      }

      await product.update(modelDto);

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao procurar produto', 'unknown', 500);
    }
  }
}
