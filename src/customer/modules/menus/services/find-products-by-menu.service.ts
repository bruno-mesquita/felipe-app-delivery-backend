import Image from '@core/image';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';

export class FindProductsByMenuService {
  static LIMIT = 15;

  async execute(menuId: string, page = 0): Promise<ServiceResponse<any[]>> {
    try {
      const limit = FindProductsByMenuService.LIMIT;
      const offset = FindProductsByMenuService.LIMIT * page;

      const menu = await Menu.findOne({ where: { id: menuId }, attributes: ['id'] });

      if(!menu) throw new Error('Menu não encontrado');

      const products = await menu.getProducts({
        attributes: ['id', 'name', 'price', 'description'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded']
          }
        ],
        limit,
        offset
      });

      return { result: products, err: null };
    } catch (err) {
      console.log(err);
      return { result: [], err: err.message };
    }
  }
}
