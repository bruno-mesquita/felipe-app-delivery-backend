/**
 * @fileoverview serviço de listagem dos produtos
 *
 * @author Jonatas Rosa Moura

 */

import Image from '@core/image';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListProductsService {
  async execute(): Promise<ServiceResponse<Product[] | null>> {
    try {
      const products = await Product.findAll({
        attributes: ['id', 'name', 'price'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded']
          }
        ]
      });

      return { result: products, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
