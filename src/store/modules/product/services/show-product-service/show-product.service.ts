/**
 * @fileoverview serviço de exibição de um estabelecimento
 * @author Jonatas Rosa Moura
 */

import Image from '@core/image';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';

export class ShowProductService {
  async execute(id: number): Promise<ServiceResponse<Product | null>> {
    try {
      const productExists = await Product.findByPk(id);

      if (!productExists) {
        throw new Error('Produto não encontrado.');
      }

      const product = await Product.findOne({
        attributes: ['id', 'name', 'price', 'description', 'menu_id'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded']
          }
        ]
      });

      return { result: product, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
