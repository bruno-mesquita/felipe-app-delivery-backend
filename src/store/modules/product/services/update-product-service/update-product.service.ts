import Image from '@core/image';
import Menu from '@core/menu';
import Product from '@core/product';
import ApiError from '@shared/utils/ApiError';
import type { UpdateProductDto } from '../../dtos/update-product-dto';

export class UpdateProductService {
  async execute({
    id,
    menu,
    image,
    ...modelDto
  }: UpdateProductDto): Promise<void> {
    try {
      // Verificando se o produto existe
      const product = await Product.findByPk(id, {
        attributes: ['image_id', 'id'],
      });

      if (!product) throw new ApiError('Produto não encontrado.');

      if (menu) {
        const menuExists = await Menu.findByPk(menu, { attributes: ['id'] });

        if (!menuExists) throw new ApiError('Menu não encontrado.');

        modelDto.menu_id = menu;
      }

      if (image) {
        const photo = await Image.findOne({
          where: { id: product.get('image_id') },
          attributes: ['id', 'encoded'],
        });

        if (!photo) throw new ApiError('Imagem não encontrada.');

        await photo.update({ encoded: image });
      }

      await product.update(modelDto);
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao procurar produto', 'unknown', 500);
    }
  }
}
