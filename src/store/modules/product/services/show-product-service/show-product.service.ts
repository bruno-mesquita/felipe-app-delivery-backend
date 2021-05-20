/**
 * @fileoverview serviço de exibição de um estabelecimento
 * @author Jonatas Rosa Moura
 */

import Image from '@core/image';
import Menu from '@core/menu';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';

export class ShowProductService {
  async execute(id: number, establishmentId: number): Promise<ServiceResponse<Product | null>> {
    try {
      const product = await Product.findOne({
        where: { id },
        attributes: ['id', 'name', 'price', 'description', 'menu_id', 'active'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded']
          },
          {
            model: Menu,
            as: 'menu',
            where: { establishment_id: establishmentId },
          }
        ]
      });

      return { result: product, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
