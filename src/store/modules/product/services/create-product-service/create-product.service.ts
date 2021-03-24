/**
 * @fileoverview Casos de testes para a criação do produto
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { getCustomRepository } from 'typeorm';

import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';
import { MenuRepository } from '@store/modules/menus/menu-repository';
import { ProductRepository } from '../../repository/product.repository';
import { CreateProductDto } from '../../dtos/create-product-dto';
import createProductSchema from '../../validation/create-product.validation';

class CreateProductService {
  public async execute(createProductDto: CreateProductDto): Promise<ServiceResponse<Product | null>> {
    try {
      const productRepository = getCustomRepository(ProductRepository);
      const menuRepository = getCustomRepository(MenuRepository);

      const valid = createProductSchema.isValidSync(createProductDto);

      if (!valid) throw new Error('Por favor reveja seus dados.');

      // Verificando se o Menu existe.

      const menu = await menuRepository.findById(createProductDto.menu);

      if (!menu) throw new Error('Menu não encontrado no sistema.');

      const product = productRepository.create({
        ...createProductDto,
        menu,
      });

      await productRepository.save(product);

      return { result: product, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export default CreateProductService;
