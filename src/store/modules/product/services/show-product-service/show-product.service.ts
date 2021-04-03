/**

 * @fileoverview serviço de exibição de um estabelecimento

 *

 * @author Jonatas Rosa Moura

 */

import Product from 'src/core/product';
import { ServiceResponse } from '@shared/utils/service-response';

export class ShowProductService {
  async execute(id: string): Promise<ServiceResponse<Product | null>> {
    try {
      const product = await productRepository.findById(id);

      if (!product) {
        throw new Error('Produto não encontrado.');
      }

      return { result: product, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
