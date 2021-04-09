/**
 * @fileoverview Casos de testes para a criação do produto
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */
import Image from '@core/image';
import Menu from '@core/menu';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateProductDto } from '../../dtos/create-product-dto';
import createProductSchema from '../../validation/create-product.validation';

class CreateProductService {
  public async execute(createProductDto: CreateProductDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = createProductSchema.isValidSync(createProductDto);

      if (!valid) throw new Error('Por favor reveja seus dados.');

      // Verificando se o Menu existe.

      const menu = await Menu.findByPk(createProductDto.menu);

      if (!menu) throw new Error('Menu não encontrado no sistema.');

      // Verificando se já existe esse produto

      const productExists = await Product.findOne({
        where: {name: createProductDto.name},
      });

      if (productExists) throw new Error('Produto já cadastrado no sistema!');

      // Pegando valor da image do produto

      const image = await Image.findOne({
        where: { name: createProductDto.name, encoded: createProductDto.image },
      });

      // verificando se ela existe
      if (image.name && image.encoded === "") {
        throw new Error('Selecione uma image para o produto!');
      }

      // Salvando imagev
      await image.save();

      await Product.create({
        ...createProductDto,
        image: image.encoded,
        menu_id: menu.id,
      });

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}

export default CreateProductService;
