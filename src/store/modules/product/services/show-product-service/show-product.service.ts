/**
 * @fileoverview serviço de exibição de um estabelecimento
 * @author Jonatas Rosa Moura
 */

import Product from 'src/core/product';
import { ServiceResponse } from '@shared/utils/service-response';

export class ShowProductService {
  async execute(id: number): Promise<ServiceResponse<Product | null>> {
    try {
      const productExists = await Product.findByPk(id);

      if (!productExists) {
        throw new Error('Produto não encontrado.');
      }

      const product = await Product.findOne({
        attributes: ['id', 'name', 'price', 'description'],
      });

      return { result: product, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
