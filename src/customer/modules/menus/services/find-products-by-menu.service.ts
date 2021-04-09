import Image from '@core/image';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';

export class FindProductsByMenuService {
  async execute(menuId: string, page: number = 1): Promise<ServiceResponse<any[]>> {
    try {
      const menu = await Menu.findByPk(menuId);

      if(!menu) throw new Error('Menu não encontrado');

      const products = (await menu.getProducts({
        attributes: ['id', 'name', 'price', 'description'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded']
          }
        ],
        limit: 15,
        offset: page * 15,
      })).map(item => ({
        id: item.id,
        name: item.name,
        photo: item.photo.encoded,
        description: item.description,
        price: item.price,
      }));

      return { result: products, err: null };
    } catch (err) {
      console.log(err);
      return { result: [], err: err.message };
    }
  }
}
