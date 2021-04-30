/**
 * @fileoverview serviço de listagem dos produtos
 *
 * @author Jonatas Rosa Moura

 */

import Image from '@core/image';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListProductsService {
  static LIMIT = 15

  async execute(page?: number | undefined): Promise<ServiceResponse<Product[] | null>> {
    try {
      const limit = ListProductsService.LIMIT;
      const offset = ListProductsService.LIMIT * page || 0;

      const products = await Product.findAll({
        attributes: ['id', 'name', 'price', 'menu_id'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded']
          }
        ],
        limit,
        offset,
      });

      return { result: products, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
