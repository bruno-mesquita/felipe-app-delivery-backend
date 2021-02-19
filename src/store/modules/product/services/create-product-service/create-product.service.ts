/**
 * @fileoverview Casos de testes para a criação do produto
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { getCustomRepository } from 'typeorm';

import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';
import { ProductRepository } from '../../repository/product.repository';
import { CreateProductDto } from '../../dtos/create-product-dto';
import createProductSchema from '../../validation/create-product.validation';

class CreateProductService {
  public async execute(productProps: CreateProductDto): Promise<ServiceResponse<Product | null>> {
    try {
      const productRepository = getCustomRepository(ProductRepository);

      const valid = createProductSchema.isValidSync(productProps);

      if (!valid) throw new Error('Por favor reveja seus dados.');

      const product = productRepository.create(productProps);

      await productRepository.save(product);

      return { result: product, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export default CreateProductService;
