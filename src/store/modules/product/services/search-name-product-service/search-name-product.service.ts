import { Op } from 'sequelize';

import Image from '@core/image';
import Menu from '@core/menu';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';

export class SearchNameProductsService {
  async execute(productName: string, establishmentId: number): Promise<ServiceResponse<Product[] | null>> {
    try {
      const products = await Product.findAll({
        where: { name: { [Op.iLike]: `%${productName}%` } },
        attributes: ['id', 'name', 'price'],
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
            attributes: ['id']
          }
        ],
      });

      return { result: products, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
