import { getCustomRepository } from 'typeorm';
import { ServiceResponse } from '@shared/utils/service-response';
import { MenuRepository } from '../../../menus/menu-repository';

export class ListProductsMenuService {
  async execute(menu_id: string): Promise<ServiceResponse<any[] | null>> {
    try {
      const menuRepository = getCustomRepository(MenuRepository);

      // Aqui está faltando a image dos produtos.

      const productsMenu = await menuRepository.findOne({
        where: {
          id: menu_id,
        },
        relations: ['products'],
      });

      return { result: [productsMenu], err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
