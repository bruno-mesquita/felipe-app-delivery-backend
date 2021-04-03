/**
 * @fileoverview serviço de listagem dos produtos
 *
 * @author Jonatas Rosa Moura

 */

import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListProductsService {
  async execute(): Promise<ServiceResponse<Product[] | null>> {
    try {
      const products = await productsRepository.find();

      return { result: products, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
