/**
 * @fileoverview serviço de listagem dos produtos
 *
 * @author Jonatas Rosa Moura

 */

import { getCustomRepository } from 'typeorm';
import { ServiceResponse } from '@shared/utils/service-response';
import Product from '../../typeorm/entity/product.entity';
import { ProductRepository } from '../../typeorm/repository/product.repository';

export class ListProductsService {
  async execute(): Promise<ServiceResponse<Product[] | null>> {
    try {
      const productsRepository = getCustomRepository(ProductRepository);

      const products = await productsRepository.find();

      return { result: products, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
