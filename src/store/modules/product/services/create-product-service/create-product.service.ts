import Menu from '@core/menu';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateProductDto } from '../../dtos/create-product-dto';
import createProductSchema from '../../validation/create-product.validation';

export class CreateProductService {
  public async execute(createProductDto: CreateProductDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = createProductSchema.isValidSync(createProductDto);

      if (!valid) throw new Error('Por favor reveja seus dados.');

      // Verificando se o Menu existe.

      const menu = await Menu.findByPk(createProductDto.menu, { attributes: ['id'] });

      if (!menu) throw new Error('Menu não encontrado no sistema.');

      await Product.create({
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        active: createProductDto.active,
        photo: { encoded: createProductDto.image },
        menu_id: menu.getId(),
      }, {
        include: [Product.Photo],
      });

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}
